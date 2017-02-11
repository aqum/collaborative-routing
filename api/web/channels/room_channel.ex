defmodule CollaborativeRouting.RoomChannel do
  import Ecto.Query
  use Phoenix.Channel
  alias CollaborativeRouting.Repo
  alias CollaborativeRouting.Comment
  alias CollaborativeRouting.Point
  alias CollaborativeRouting.Route

  def join("rooms:lobby", _message, socket) do
    {:ok, socket}
  end

  def handle_in("method:feedback.list", _message, socket) do
    comments = Repo.all(
      from comment in Comment,
      order_by: [desc: comment.inserted_at]
    )
    {:reply, {:ok, %{ :comments => comments }}, socket}
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
end
