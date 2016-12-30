defmodule CollaborativeRouting.CommentTest do
  use CollaborativeRouting.ModelCase

  alias CollaborativeRouting.Comment

  @valid_attrs %{content: "some content", lat: "120.5", lng: "120.5"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Comment.changeset(%Comment{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Comment.changeset(%Comment{}, @invalid_attrs)
    refute changeset.valid?
  end
end
