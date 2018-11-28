import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {ITodo} from '../interfaces/iTodo';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {TodosService} from './todos.service';


@Injectable({
  providedIn: 'root'
})
export class TodoResolverService implements Resolve<ITodo[]> {

  constructor(
    private todoService: TodosService
  ) {
  }

  resolve(): Observable<ITodo[]> {
    const storageList = this.todoService.getTodoList();
    const data: Observable<ITodo[]> = of(storageList);
    return data.pipe(
      delay(1000)
    );


  }
}
