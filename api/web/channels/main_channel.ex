defmodule CollaborativeRouting.MainChannel do
  import Ecto.Query
  use Phoenix.Channel
  alias CollaborativeRouting.Route
  alias CollaborativeRouting.Repo

  def join("main", _message, socket) do
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
end