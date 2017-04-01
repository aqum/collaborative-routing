defmodule :"Elixir.CollaborativeRouting.Repo.Migrations.Create-token" do
  use Ecto.Migration

  def change do
    create table(:tokens, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :route_id, references(:routes, on_delete: :nothing)

      timestamps()
    end
    create index(:tokens, [:route_id], unique: true)

  end
end
