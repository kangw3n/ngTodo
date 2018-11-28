export interface ITodo {
  id: number;
  state: boolean;
  task: string;
  editing?: boolean;
  hiddenState?: boolean;
  refId?: string;
  userID?: string;
}

export interface ITodoType extends  ITodo { type?: string; }

