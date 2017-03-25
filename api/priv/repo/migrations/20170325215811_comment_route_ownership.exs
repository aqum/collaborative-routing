defmodule CollaborativeRouting.Repo.Migrations.CommentRouteOwnership do
  use Ecto.Migration

  def change do
    alter table(:comments) do
      remove :user_id
      add :user_id, :string
      add :route_id, references(:routes, on_delete: :nothing)
    end
  end
end
