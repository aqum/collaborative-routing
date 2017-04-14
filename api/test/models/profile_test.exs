defmodule CollaborativeRouting.ProfileTest do
  use CollaborativeRouting.ModelCase

  alias CollaborativeRouting.Profile

  @valid_attrs %{auth_id: "some content", name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Profile.changeset(%Profile{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Profile.changeset(%Profile{}, @invalid_attrs)
    refute changeset.valid?
  end
end
