defmodule CollaborativeRouting.RoomChannel do
  use Phoenix.Channel

  def join("rooms:lobby", message, socket) do
    {:ok, socket}
  end

  def handle_in("method:comment.add", message, socket) do
    broadcast! socket, "event:comment_added", %{payload: message["payload"]}
  end
end
