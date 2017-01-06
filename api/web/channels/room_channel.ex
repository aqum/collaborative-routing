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
    comment = %{
      :content => message["payload"]["content"],
      :lat => message["payload"]["coordinates"]["lat"],
      :lng => message["payload"]["coordinates"]["lng"],
    }

    changeset = Comment.changeset(%Comment{}, comment)
    case Repo.insert(changeset) do
      {:ok, comment} ->
        broadcast! socket, "event:comment_added", %{payload: %{
          :content => comment.content,
          :coordinates => %{
            :lat => comment.lat,
            :lng => comment.lng,
          },
          :author => %{
            :name => "Natalia",
          },
        }}
        {:ok, socket}

      {:error, changeset} ->
        broadcast! socket, "event:error", %{payload: changeset}
        {:error, socket}
    end
  end
end
