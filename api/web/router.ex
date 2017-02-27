defmodule CollaborativeRouting.Router do
  use CollaborativeRouting.Web, :router

  @doc """
  Function that will serve as Plug for verifying metadata
  """
  def check_admin_metadata(conn, _opts) do
    claims = Map.get(conn.assigns, :joken_claims)
    case Map.get(claims, "app_metadata") do
      %{"role" => "admin"} ->
        assign(conn, :admin, true)
      _ ->
        conn
        |> forbidden
    end
  end

  @doc """
  send 403 to client
  """
  def forbidden(conn) do
    msg = %{
      errors: %{
        details: "forbidden resource"
      }
    }
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(403, Poison.encode!(msg))
    |> halt
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Joken.Plug,
      verify: &CollaborativeRouting.JWTHelpers.verify/0,
      on_error: &CollaborativeRouting.JWTHelpers.error/2
  end

  pipeline :api_admin do
    plug :check_admin_metadata
  end

  scope "/api", CollaborativeRouting do
    pipe_through :api

    get "/status", StatusController, :index
  end

  scope "/api/admin", CollaborativeRouting do
    pipe_through [:api, :api_admin]

    get "/", StatusController, :admin
  end
end
