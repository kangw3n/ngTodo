import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'angular-webstorage-service';
import {ITodo} from '../interfaces/iTodo';

const STORAGE_KEY = 'local_todolist';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
  }

  getTodoList(): ITodo[] {
    return this.storage.get(STORAGE_KEY) || [];
  }

  addTodo({id, state, task}: ITodo): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let currentTodoList: ITodo[] = this.storage.get(STORAGE_KEY) || [];
      currentTodoList = [...currentTodoList, {id, state, task}];
      this.storage.set(STORAGE_KEY, currentTodoList);
      resolve();
    });
  }

  setAllTodoList(todoLists: ITodo[]): void {
    this.storage.set(STORAGE_KEY, todoLists);
  }

  toggleAllTask(state: boolean): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const currentTodoLists: ITodo[] = this.storage.get(STORAGE_KEY) || [];
      const toggledLists = currentTodoLists.map(todo => {
        todo.state = state;
        return todo;
      });
      this.setAllTodoList(toggledLists);
      resolve();
    });
  }

  editTodo({id, state, task}: ITodo): Promise<any> {
    return new Promise((resolve, reject) => {
      let currentTodoList: ITodo[] = this.storage.get(STORAGE_KEY) || [];
      currentTodoList = currentTodoList.map(todo => {
        if (todo.id === id) {
          todo = {id, state, task};
        }
        return todo;
      });
      this.storage.set(STORAGE_KEY, currentTodoList);
      resolve();
    });
  }

  removeTodo({id}: ITodo): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let currentTodoList: ITodo[] = this.storage.get(STORAGE_KEY) || [];
      currentTodoList = currentTodoList.filter(todo => todo.id !== id);
      this.storage.set(STORAGE_KEY, currentTodoList);
      resolve();
    });

  }

  clearCompletedTodo(): Promise<any> {
    return new Promise((resolve, reject) => {
      let currentTodoList: ITodo[] = this.storage.get(STORAGE_KEY) || [];
      currentTodoList = currentTodoList.filter(todo => !todo.state);
      this.storage.set(STORAGE_KEY, currentTodoList);
      resolve();
    });

  }
}
