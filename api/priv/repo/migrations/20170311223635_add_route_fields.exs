defmodule CollaborativeRouting.Repo.Migrations.AddRouteFields do
  use Ecto.Migration

  def change do
    alter table(:routes) do
      add :user_id, :string
      add :title, :string
    end
  end
end
