import {Component, OnInit} from '@angular/core';
import {ITodo, ITodoType} from '../interfaces/iTodo';
import {ActivatedRoute} from '@angular/router';
import {DocumentReference} from '@angular/fire/firestore';
import {TodosService} from '../services/todos.service';
import {TodosFirebaseService} from '../services/todos-firebase.service';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.styl']
})
export class TodosComponent implements OnInit {

  buttons: string[] = ['All', 'Active', 'Completed'];
  selection = 'All';
  todoLists: ITodo[];
  currentRoute: string;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodosService,
    private afsTodoService: TodosFirebaseService
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(({todos}) => {
      this.todoLists = todos;
    });
    const urlSnapshot = this.route.snapshot.url;
    this.currentRoute = urlSnapshot.length ? urlSnapshot[0].path : '';
  }

  changeSelection(event, type: string = 'All'): void {
    event.preventDefault();
    switch (type) {

      case 'All':
        this.todoLists = this.todoLists.map(el => {
          el.hiddenState = false;
          return el;
        });
        break;
      case 'Active':
        this.todoLists = this.todoLists.map(el => {
          el.hiddenState = el.state;
          return el;
        });
        break;
      case 'Completed':
        this.todoLists = this.todoLists.map(el => {
          el.hiddenState = !el.state;
          return el;
        });
        break;
    }
    this.selection = type;
  }

  clearComplete() {
    const clearTask = (this.currentRoute === '') ? this.todoService.clearCompletedTodo() : this.afsTodoService.clearCompletedTodo();
    clearTask.then(() => {
      this.todoLists = this.todoLists.filter(el => !el.state);
    });
  }

  checkDuplicate(): number {
    const idList: number[] = this.todoLists.map(el => el.id);
    let randomIndex: number = Math.floor(Math.random() * 1000) + 1;
    while (idList.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * 1000) + 1;
    }
    return randomIndex;
  }

  addTodo(event): void {
    const task: string = event.target.value;
    const todo: ITodo = {
      id: this.checkDuplicate(),
      task,
      state: false
    };

    const addTask = (this.currentRoute === '') ? this.todoService.addTodo(todo) : this.afsTodoService.addTodo(todo);

    addTask.then((docRef: DocumentReference) => {
      const newTodo = {...todo};
      if (docRef) {
        newTodo.refId = docRef.id;
      }
      event.target.value = '';
      this.todoLists = [...this.todoLists, {...newTodo}];
      console.log('new', newTodo);
    });

  }

  selectAll(e): void {
    const isCheck: boolean = e.target.checked;
    const allTask = (this.currentRoute === '') ? this.todoService.toggleAllTask(isCheck) : this.afsTodoService.toggleAllTask(isCheck);

    allTask.then(() => {
      this.todoLists = this.todoLists.map(el => {
        el.state = isCheck;
        return el;
      });
    });

  }

  checkTaskLength(): number {
    return this.todoLists.filter(el => !el.state).length;
  }

  updateChanges(event: ITodoType): void {
    const {type, ...updatedTodo} = event;
    switch (type) {
      case 'toggle':
      case 'edit':
        const editTask = (this.currentRoute === '') ? this.todoService.editTodo(updatedTodo) : this.afsTodoService.editTodo(updatedTodo);
        editTask.then(() => {
          this.todoLists = this.todoLists.map(todo => {
            if (todo.id === updatedTodo.id) {
              todo.task = updatedTodo.task;
            }
            return todo;
          });
          console.log('updated', updatedTodo);
        });
        break;
      case 'delete':
        const deleteTask = (this.currentRoute === '') ? this.todoService.removeTodo(updatedTodo) : this.afsTodoService.removeTodo(updatedTodo);
        deleteTask.then(() => {
          this.todoLists = this.todoLists.filter(todo => todo.id !== updatedTodo.id);
          console.log('delete', updatedTodo);
        });
        break;
      default:
        console.log('error occur');
    }


    // this.todoService.setAllTodoList(this.todoLists);
  }

}
