import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITodo, ITodoType} from '../interfaces/iTodo';


@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.styl']
})
export class TodoComponent implements OnInit {
  @Input() todo: ITodo;
  @Output() todoChanges: EventEmitter<ITodoType> = new EventEmitter();
  task: string;

  constructor() {
  }

  ngOnInit() {

  }

  todoToggle(): void {
    this.todo.state = !this.todo.state;
    this.todoChanges.emit({type: 'toggle', ...this.todo});
  }

  editTodo(): void {
    this.todo.editing = true;
  }

  removeTodo(): void {
    this.todoChanges.emit({type: 'delete', ...this.todo});
  }

  saveTodo(event): void {
    this.todo.task = event.target.value;
    this.todo.editing = false;
    this.todoChanges.emit({type: 'edit', ...this.todo});
  }


}
