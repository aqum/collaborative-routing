defmodule CollaborativeRouting.SuggestionMethods do
  import Ecto.Query
  use Phoenix.Channel
  alias CollaborativeRouting.Suggestion
  alias CollaborativeRouting.Point
  alias CollaborativeRouting.Repo

  def handle_in("method:suggestion.list", _message, socket) do
    suggestion = Repo.all(
      from suggestion in Suggestion,
      order_by: [desc: suggestion.inserted_at]
    )

    {:reply, {:ok, %{ :suggestions => suggestion }}, socket}
  end

  def handle_in("method:suggestion.add", message, socket) do
    waypoints = Enum.map(message["waypoints"], fn waypoint -> %Point{
      :lat => waypoint["lat"],
      :lng => waypoint["lng"]
    } end)

    case Repo.get(Suggestion, 1) do
      nil ->
        newSuggestion = %Suggestion{
          :waypoints => waypoints
        }
        suggestion = Repo.insert!(newSuggestion)
        broadcast_from! socket, "event:suggestion_added", %{payload: suggestion}

      suggestion ->
        changeset = Ecto.Changeset.change(suggestion)
        changeset = Ecto.Changeset.put_embed(changeset, :waypoints, waypoints)
        suggestion = Repo.update!(changeset)
        broadcast_from! socket, "event:suggestion_added", %{payload: suggestion}
    end

    {:reply, :ok, socket}
  end
end
