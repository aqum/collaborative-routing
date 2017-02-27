# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :collaborative_routing,
  ecto_repos: [CollaborativeRouting.Repo]

# Configures the endpoint
config :collaborative_routing, CollaborativeRouting.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "pFoNkSR0uN+KChoC7xtu8tZ6Q9zTX799tEXFi5lpbtF51ACGR7i6qz6b8slk5f+L",
  render_errors: [view: CollaborativeRouting.ErrorView, accepts: ~w(html json)],
  pubsub: [name: CollaborativeRouting.PubSub,
           adapter: Phoenix.PubSub.PG2],
  app_baseurl: System.get_env("AUTH0_BASEURL"),
  app_id: System.get_env("AUTH0_APP_ID"),
  app_secret: System.get_env("AUTH0_APP_SECRET")

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
