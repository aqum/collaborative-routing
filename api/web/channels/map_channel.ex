defmodule CollaborativeRouting.MapChannel do
  import Ecto.Query
  use Phoenix.Channel
  alias CollaborativeRouting.Repo
  alias CollaborativeRouting.Comment
  alias CollaborativeRouting.Point
  alias CollaborativeRouting.Route
  alias CollaborativeRouting.Suggestion
  alias CollaborativeRouting.Token
  alias CollaborativeRouting.User

  def join("map:" <> route_id, message, socket) do
    case is_nil(socket.assigns.user_id) do
      true ->
        case UUID.info(message["accessToken"]) do
          {:error, _error} ->
            {:error, %{ reason: "unauthorized" }}

          {:ok, details} ->
            token = Repo.get(Token, message["accessToken"])

            case token do
              nil -> {:error, %{ reason: "unauthorized" }}
              _token -> {:ok, socket}
            end
        end

      false ->
        query = from route in Route, where: route.user_id == ^socket.assigns.user_id
        route = Repo.get(query, route_id)

        case route == nil do
          true -> {:error, %{reason: "404"}}
          false -> {:ok, socket}
        end
    end
  end

  def handle_in("method:comment.list", _message, socket) do
    "map:" <> route_id = socket.topic

    comments = Repo.all(
      from comment in Comment,
      where: comment.route_id == ^route_id and is_nil(comment.reply_to_id),
      order_by: [desc: comment.inserted_at],
      preload: [:user, replies: [:user, :replies]]
    )

    IO.inspect comments

    {:reply, {:ok, %{ :comments => comments }}, socket}
  end

  def handle_in("method:suggestion.list", _message, socket) do
    suggestions = Repo.all(
      from suggestion in Suggestion,
      order_by: [desc: suggestion.inserted_at]
    )

    {:reply, {:ok, %{ :suggestions => suggestions }}, socket}
  end

  def handle_in("method:comment.add", message, socket) do
    "map:" <> route_id = socket.topic
    {route_id_int, _} = Integer.parse(route_id)

    changeset = Comment.changeset(%Comment{
      content: message["content"],
      lat: message["lat"],
      lng: message["lng"],
      route_id: route_id_int,
      user_id: socket.assigns.user_id,
      reply_to: message["reply_to"],
    })

    case Repo.insert(changeset) do
      {:ok, comment} ->
        parsed_comment = Map.delete(Map.delete(Repo.preload(comment, :user), :route), :replies)
        broadcast_from! socket, "event:comment_added", %{payload: parsed_comment}
        {:reply, {:ok, parsed_comment}, socket}

      {:error, changeset} ->
        IO.puts changeset
        {:reply, :error, socket}
    end
  end

  def handle_in("method:route.details", _message, socket) do
    "map:" <> route_id = socket.topic
    route = Repo.get(Route, route_id)

    token = Repo.get_by(Token, route_id: route.id)
    if token do
      route = Map.put(route, :accessToken, token.id)
    end

    {:reply, {:ok, route}, socket}
  end

  def handle_in("method:route.edit", message, socket) do
    "map:" <> route_id = socket.topic

    waypoints = Enum.map(message, fn waypoint -> %Point{
      :lat => waypoint["lat"],
      :lng => waypoint["lng"]
    } end)

    case Repo.get(Route, route_id) do
      nil ->
        newRoute = %Route{
          :waypoints => waypoints
        }
        Repo.insert!(newRoute)

      route ->
        changeset = Ecto.Changeset.change(route)
        changeset = Ecto.Changeset.put_embed(changeset, :waypoints, waypoints)
        Repo.update!(changeset)
    end

    broadcast_from! socket, "event:route_changed", %{payload: waypoints}
    {:reply, :ok, socket}
  end

  def handle_in("method:suggestion.add", message, socket) do
    waypoints = Enum.map(message["waypoints"], fn waypoint -> %Point{
      :lat => waypoint["lat"],
      :lng => waypoint["lng"]
    } end)

    case Repo.get(Suggestion, 1) do
      nil ->
        newSuggestion = %Suggestion{
          :waypoints => waypoints
        }
        suggestion = Repo.insert!(newSuggestion)
        broadcast_from! socket, "event:suggestion_added", %{payload: suggestion}

      suggestion ->
        changeset = Ecto.Changeset.change(suggestion)
        changeset = Ecto.Changeset.put_embed(changeset, :waypoints, waypoints)
        suggestion = Repo.update!(changeset)
        broadcast_from! socket, "event:suggestion_added", %{payload: suggestion}
    end

    {:reply, :ok, socket}
  end

  def handle_in("method:token.create", _message, socket) do
    "map:" <> route_id = socket.topic
    routeQuery = from route in Route, where: route.user_id == ^socket.assigns.user_id

    case Repo.get(routeQuery, route_id) do
      nil ->
        {:reply, :error, socket}

      route ->
        case Repo.get_by(Token, route_id: route.id) do
          nil ->
            IO.puts("No token to delete")
          token ->
            Repo.delete!(token)
        end

        newToken = %Token{route: route}
        token = Repo.insert!(newToken);
        bareToken = Map.delete(token, :route)

        {:reply, {:ok, bareToken}, socket}
    end
  end

  def handle_in("method:route.changeTitle", message, socket) do
    "map:" <> route_id = socket.topic
    query = from route in Route, where: route.user_id == ^socket.assigns.user_id
    route = Repo.get(query, route_id)
    changeset = Ecto.Changeset.change(route, title: message["title"])
    Repo.update!(changeset)

    broadcast_from! socket, "event:title_changed", %{payload: message["title"]}
    {:reply, :ok, socket}
  end
end
