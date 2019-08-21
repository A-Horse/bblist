import { Record, List } from "immutable";


export type KanbanColumnRecord = Record<{
    id: string;
    name: string;
    order: number;
    cards: List<any>;
}>