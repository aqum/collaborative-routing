defmodule CollaborativeRouting.RouteTest do
  use CollaborativeRouting.ModelCase

  alias CollaborativeRouting.Route

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Route.changeset(%Route{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Route.changeset(%Route{}, @invalid_attrs)
    refute changeset.valid?
  end
end
