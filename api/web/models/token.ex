defmodule CollaborativeRouting.Token do
  use CollaborativeRouting.Web, :model

  @derive {Poison.Encoder, except: [:__meta__, :user]}
  @primary_key {:id, :binary_id, autogenerate: true}
  schema "tokens" do
    belongs_to :route, CollaborativeRouting.Route

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:token])
    |> validate_required([:token])
  end
end
