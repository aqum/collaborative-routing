defmodule CollaborativeRouting.Repo.Migrations.CommentReplies do
  use Ecto.Migration

  def change do
    alter table(:comments) do
      add :reply_to_id, references(:comments, on_delete: :nothing)
    end
  end
end
