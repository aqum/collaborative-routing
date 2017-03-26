defmodule CollaborativeRouting.MapChannel do
  import Ecto.Query
  use Phoenix.Channel
  alias CollaborativeRouting.Repo
  alias CollaborativeRouting.Comment
  alias CollaborativeRouting.Point
  alias CollaborativeRouting.Route
  alias CollaborativeRouting.Suggestion

  def join("map:" <> route_id, _message, socket) do
    query = from route in Route, where: route.user_id == ^socket.assigns.user_id
    route = Repo.get(query, route_id)

    case route do
      nil ->
        {:error, %{reason: "404"}}

      _route ->
        assign(socket, :route_id, route_id)
        {:ok, socket}
    end
  end

  def handle_in("method:comment.list", _message, socket) do
    "map:" <> route_id = socket.topic

    comments = Repo.all(
      from comment in Comment,
      where: comment.route_id == ^route_id,
      order_by: [desc: comment.inserted_at]
    )

    parsed_comments = Enum.map(comments, fn comment -> Map.delete(comment, :route) end)

    {:reply, {:ok, %{ :comments => parsed_comments }}, socket}
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
    })

    case Repo.insert(changeset) do
      {:ok, comment} ->
        parsed_comment = Map.delete(comment, :route)
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
end
