defmodule CollaborativeRouting.RoomChannel do
  import Ecto.Query
  use Phoenix.Channel
  alias CollaborativeRouting.Repo
  alias CollaborativeRouting.Comment
  alias CollaborativeRouting.Point
  alias CollaborativeRouting.Route
  alias CollaborativeRouting.Suggestion

  def join("rooms:lobby", _message, socket) do
    {:ok, socket}
  end

  def handle_in("method:route.list", _message, socket) do
    routes = Repo.all(
      from route in Route,
      where: route.user_id == ^socket.assigns.user_id,
      select: %{
        id: route.id,
        title: route.title,
      }
    )

    {:reply, {:ok, %{ :routes => routes }}, socket}
  end

  def handle_in("method:route.create", message, socket) do
    changeset = Route.changeset(%Route{
      title: message["title"],
      user_id: socket.assigns.user_id,
    })

    case Repo.insert(changeset) do
      {:ok, route} ->
        {:reply, {:ok, route}, socket}

      {:error, _changeset} ->
        {:reply, :error, socket}
    end
  end

  def handle_in("method:comment.list", _message, socket) do
    comments = Repo.all(
      from comment in Comment,
      order_by: [desc: comment.inserted_at]
    )

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
    changeset = Comment.changeset(%Comment{}, message)

    case Repo.insert(changeset) do
      {:ok, comment} ->
        broadcast_from! socket, "event:comment_added", %{payload: comment}
        {:reply, {:ok, comment}, socket}

      {:error, _changeset} ->
        {:reply, :error, socket}
    end
  end

  def handle_in("method:route.details", _message, socket) do
    route = Repo.get(Route, 1)
    {:reply, {:ok, route}, socket}
  end

  def handle_in("method:route.edit", message, socket) do
    waypoints = Enum.map(message, fn waypoint -> %Point{
      :lat => waypoint["lat"],
      :lng => waypoint["lng"]
    } end)

    case Repo.get(Route, 1) do
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
