import { Injectable } from '@angular/core';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  getRedirectResult,
  UserCredential,
  Auth
} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = getAuth();

  // ✅ Google login
  loginWithGoogle() {
    return signInWithRedirect(this.auth, new GoogleAuthProvider());
  }

  // ✅ Handle redirect result
  handleRedirectResult(): Promise<UserCredential | null> {
    return getRedirectResult(this.auth);
  }

  // ✅ Email login
  loginWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // ✅ Register
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // ✅ Logout
  logout() {
    return signOut(this.auth);
  }
}