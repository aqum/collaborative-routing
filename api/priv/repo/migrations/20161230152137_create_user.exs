defmodule CollaborativeRouting.Repo.Migrations.CreateProfile do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :string, primary_key: true
      add :name, :string

      timestamps()
    end
    create index(:users, [:id], unique: true)

  end
end
