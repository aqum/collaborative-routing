defmodule CollaborativeRouting.Comment do
  use CollaborativeRouting.Web, :model

  @derive {Poison.Encoder, except: [:__meta__, :route, :reply_to, :user_id]}
  schema "comments" do
    field :content, :string
    field :lat, :float
    field :lng, :float
    belongs_to :route, CollaborativeRouting.Route
    belongs_to :user, CollaborativeRouting.User, type: :string
    belongs_to :reply_to, CollaborativeRouting.Comment
    has_many :replies, CollaborativeRouting.Comment, foreign_key: :reply_to_id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:content, :lat, :lng])
    |> validate_required([:content])
  end
end
