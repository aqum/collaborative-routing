defmodule CollaborativeRouting.Repo.Migrations.CreateRoute do
  use Ecto.Migration

  def change do
    create table(:routes) do
      add :waypoints, {:array, :map}, default: []
      add :user_id, references(:users, type: :string, on_delete: :nothing)
      add :title, :string

      timestamps()
    end
    create index(:routes, [:user_id])

  end
end
