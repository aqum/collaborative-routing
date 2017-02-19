defmodule CollaborativeRouting.RouteMethods do
  import Ecto.Query
  use Phoenix.Channel
  alias CollaborativeRouting.Repo
  alias CollaborativeRouting.Route
  alias CollaborativeRouting.Point

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

end
