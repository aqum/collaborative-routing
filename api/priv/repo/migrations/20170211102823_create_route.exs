defmodule CollaborativeRouting.Repo.Migrations.CreateRoute do
  use Ecto.Migration

  def change do
    create table(:routes) do
      add :waypoints, {:array, :map}, default: []

      timestamps()
    end

  end
end
