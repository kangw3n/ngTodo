import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

import {auth} from 'firebase/app';
import {Observable, of} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {IUser} from '../interfaces/iUser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<IUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    ); // this observable will keep emit value
  }


  googleLogin(): void {
    const provider = new auth.GoogleAuthProvider();
    this.oAuthLogin(provider).then((credential) => {
      this.updateUserData(credential);
    });
  }

  private oAuthLogin(provider): Promise<any> {
    return this.afAuth.auth.signInWithPopup(provider);
  }

  updateUserData({user}) {
    console.log(user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data, {merge: true});
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      console.log('fullfill');
      this.router.navigate(['/']);
    });
  }
}
