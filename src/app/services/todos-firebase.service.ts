import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentSnapshot} from '@angular/fire/firestore';
import {ITodo} from '../interfaces/iTodo';
import {AuthService} from './auth.service';
import {IUser} from '../interfaces/iUser';
import {take} from 'rxjs/operators';

const TODO_PATH = 'todos';

@Injectable({
  providedIn: 'root'
})
export class TodosFirebaseService {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {
  }

  addTodo(todo: ITodo): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.authService.user.pipe(take(1)).subscribe(({uid}: IUser) => {
        resolve(this.afs.collection(TODO_PATH).add({...todo, uid}));
      });
    });
  }

  editTodo(todo: ITodo): Promise<any> {
    return this.afs.doc(`${TODO_PATH}/${todo.refId}`).update(todo);
  }

  removeTodo({refId}: ITodo): Promise<any> {
    return this.afs.doc(`${TODO_PATH}/${refId}`).delete();
  }

  getTodoRefAsSnapshot(): Promise<any> {
    return this.afs.collection(TODO_PATH).get().toPromise();
  }

  clearCompletedTodo(): Promise<any> {
    return this.getTodoRefAsSnapshot().then((res) => {
      const batch = this.afs.firestore.batch();
      res.docs.forEach((docRef: DocumentSnapshot<ITodo>) => {
        const data = docRef.data();
        if (data.state) {
          batch.delete(docRef.ref);
        }
      });
      return batch.commit();
    });
  }

  toggleAllTask(state: boolean): Promise<any> {
    return this.getTodoRefAsSnapshot().then((res) => {
      const batch = this.afs.firestore.batch();
      res.docs.forEach((docRef) => {
        batch.update(docRef.ref, {state});
      });
      return batch.commit();
    });
  }
}
