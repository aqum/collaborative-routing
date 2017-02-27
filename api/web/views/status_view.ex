defmodule CollaborativeRouting.StatusView do
  use CollaborativeRouting.Web, :view

  def render("status.json", %{status: status}) do
    status
  end
end
