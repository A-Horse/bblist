declare interface TaskCard {
  id: number;
  comments: Array<Comment>;
  content: string;
  created_at: number;
  creater: any;
  createrId: number;
  executorId: number;
  index: number;
  idDone: boolean;
  ownerId: number;
  sprint: any;
  status: string;
  taskListId: number;
  taskWallId: number;
  title: string;
  updated_at: number;
}
