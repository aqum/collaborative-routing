defmodule CollaborativeRouting.Comment do
  use CollaborativeRouting.Web, :model

  schema "comments" do
    field :content, :string
    field :lat, :float
    field :lng, :float
    belongs_to :user, CollaborativeRouting.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:content, :lat, :lng])
    |> validate_required([:content, :lat, :lng])
  end
end
