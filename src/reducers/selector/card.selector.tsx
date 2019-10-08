import { RootState } from "..";
import { ProjectIssueRecord } from "../../typings/kanban-card.typing";
import { List } from "immutable";

export function selectColumnCards(
    state: RootState,
    columnId: string
  ): List<ProjectIssueRecord> | null {
    const column = state.project.get('columnMap').get(columnId);
  
    if (!column || !column.get('cards')) {
      return null;
    }
    return column
      .get('cards')!
      .map((cardId: string) => {
        return state.project.get('cardMap').get(cardId);
      })
      .filter(card => !!card) as List<ProjectIssueRecord>;
  }
  