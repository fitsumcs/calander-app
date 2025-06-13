import { ITask } from './ITask';

export interface ITaskContextProps {
  tasks: ITask[];
  isShowSearch: boolean;
  searchText: string;
  addTask: (task: ITask) => void;
  moveTask: (
    taskId: string,
    fromDate: string,
    toDate: string,
    toIndex: number,
  ) => void;
  setSearchText: (searchText: string) => void;
  setIsShowSearch: (isShow: boolean) => void;
  editTask: (task: ITask) => void;
}
