defmodule CollaborativeRouting.Route do
  use CollaborativeRouting.Web, :model

  @derive {Poison.Encoder, except: [:__meta__, :user]}
  schema "routes" do
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

defmodule CollaborativeRouting.Point do
  use Ecto.Model

  embedded_schema do
    field :lat, :float
    field :lng, :float
  end
end
