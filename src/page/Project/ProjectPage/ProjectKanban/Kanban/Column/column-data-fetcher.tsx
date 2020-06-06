import { KanbanColumnComponent } from './KanbanColumn';

export class ColumnDataFetcher {
  private obsoleted = false;

  constructor(private component: KanbanColumnComponent) {}

  public fetchCards() {
    this.component.setState({
      cardFetching: true,
    });
    this.component.props.actions.getColumnCardsRequest(
      {
        kanbanId: this.component.props.column.kanbanId,
        columnID: this.component.props.column.id,
      },
      {
        requestDoneCallback: this.onFetchDone,
      }
    );
  }

  public obsolete() {
    this.obsoleted = true;
  }

  private onFetchDone = () => {
    if (this.obsoleted) {
      return;
    }
    this.component.setState({
      cardFetching: false,
    });
  };
}
