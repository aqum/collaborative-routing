defmodule CollaborativeRouting.Point do
  use Ecto.Model

  embedded_schema do
    field :lat, :float
    field :lng, :float
  end
end
