defmodule CollaborativeRouting.Suggestion do
  use CollaborativeRouting.Web, :model

  @derive {Poison.Encoder, except: [:__meta__, :user]}
  schema "suggestions" do
    belongs_to :user, CollaborativeRouting.User
    embeds_many :waypoints, CollaborativeRouting.Point, on_replace: :delete

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [])
    |> validate_required([])
  end
end
