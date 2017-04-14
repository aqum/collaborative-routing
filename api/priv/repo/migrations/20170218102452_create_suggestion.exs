defmodule CollaborativeRouting.Repo.Migrations.CreateSuggestion do
  use Ecto.Migration

  def change do
    create table(:suggestions) do
      add :user_id, references(:users, type: :string, on_delete: :nothing)
      add :waypoints, {:array, :map}, default: []

      timestamps()
    end
    create index(:suggestions, [:user_id])

  end
end
