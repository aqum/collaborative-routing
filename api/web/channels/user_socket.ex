defmodule CollaborativeRouting.UserSocket do
  use Phoenix.Socket
  alias CollaborativeRouting.JWTHelpers
  alias CollaborativeRouting.User
  alias CollaborativeRouting.Repo

  ## Channels
  channel "map:*", CollaborativeRouting.MapChannel
  channel "main", CollaborativeRouting.MainChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  # transport :longpoll, Phoenix.Transports.LongPoll

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  def connect(params, socket) do
    payload = JWTHelpers.verify(params["token"])

    # TODO: create user on first successful auth
    case payload.error do
      nil ->
        user_id = payload.claims["sub"]
        case Repo.get(User, user_id) do
          nil ->
            changeset = User.changeset(%User{
              id: user_id,
              name: "Guest",
            })
            Repo.insert!(changeset)
          _ -> nil
        end

        {:ok, assign(socket, :user_id, user_id)}

      _error ->
        # anonymous connection, validate inside topic subscription
        {:ok, assign(socket, :user_id, nil)}
    end
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "users_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     CollaborativeRouting.Endpoint.broadcast("users_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(_socket), do: nil
end
