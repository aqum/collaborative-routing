defmodule CollaborativeRouting.MainChannel do
  import Ecto.Query
  use Phoenix.Channel
  alias CollaborativeRouting.Route
  alias CollaborativeRouting.Repo
  alias CollaborativeRouting.User

  def join("main", _message, socket) do
    case is_nil(socket.assigns.user_id) do
      true -> {:error, %{ reason: "unauthorized" }}
      false -> {:ok, socket}
    end
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

  def handle_in("method:profile.get", _message, socket) do
    currentUser = Repo.get!(User, socket.assigns.user_id)

    {:reply, {:ok, currentUser}, socket}
  end
end
