defmodule CollaborativeRouting.RoomChannel do
  use Phoenix.Channel
  alias CollaborativeRouting.Repo
  alias CollaborativeRouting.Comment

  def join("rooms:lobby", _message, socket) do
    {:ok, socket}
  end

  def handle_in("method:feedback.list", _message, socket) do
    comments = Repo.all(Comment)
    {:reply, {:ok, %{ :comments => comments }}, socket}
  end

  def handle_in("method:comment.add", message, socket) do
    comment = message["payload"]

    changeset = Comment.changeset(%Comment{}, comment)
    case Repo.insert(changeset) do
      {:ok, comment} ->
        broadcast! socket, "event:comment_added", %{payload: comment}
        {:ok, socket}

      {:error, changeset} ->
        broadcast! socket, "event:error", %{payload: changeset}
        {:error, socket}
    end
  end

  def handle_in("method:route.edit", message, socket) do
    broadcast_from! socket, "event:route_changed", %{payload: message}
    {:ok, socket}
  end
end
