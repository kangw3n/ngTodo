import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Resolve} from '@angular/router';
import {ITodo} from '../interfaces/iTodo';
import {Observable} from 'rxjs';
import {concatMap, first, map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {IUser} from '../interfaces/iUser';


@Injectable({
  providedIn: 'root'
})
export class TodoFirebaseResolverService implements Resolve<ITodo[]> {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {
  }

  resolve(): Observable<ITodo[]> {
    return this.authService.user.pipe(
      concatMap((user: IUser) => {
        return this.afs.collection<ITodo>('todos', ref => ref.where('uid', '==', user.uid)).snapshotChanges();
      }),
      map((todos) => todos.map(todo => {
        const data = todo.payload.doc.data() as ITodo;
        const refId = todo.payload.doc.id;
        return {
          ...data,
          refId
        };
      })),
      first()
    );
    // need to pipe first because route will not resolve if it does not resolve
  }
}
