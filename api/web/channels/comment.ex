defmodule CollaborativeRouting.CommentMethods do
  import Ecto.Query
  use Phoenix.Channel
  alias CollaborativeRouting.Comment
  alias CollaborativeRouting.Repo

  def handle_in("method:comment.list", _message, socket) do
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
end
