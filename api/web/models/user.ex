defmodule CollaborativeRouting.User do
  use CollaborativeRouting.Web, :model

  @derive {Poison.Encoder, except: [:__meta__, :user]}
  @primary_key {:id, :string, autogenerate: false}
  schema "users" do
    field :name, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :id])
    |> validate_required([:name, :id])
  end
end
