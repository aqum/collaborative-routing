defmodule CollaborativeRouting.Repo.Migrations.CreateComment do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :content, :string
      add :lat, :float
      add :lng, :float
      add :user_id, references(:users, type: :string, on_delete: :nothing)
      add :route_id, references(:routes, on_delete: :nothing)

      timestamps()
    end
    create index(:comments, [:user_id])
    create index(:comments, [:route_id])

  end
end
