import { Injectable, inject } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { FirestoreService } from "./firestore.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    auth = inject(AngularFireAuth);
    router = inject(Router);

    getAuth(){
        return getAuth();
    }

    singIn(user:any){
        return signInWithEmailAndPassword(getAuth(), user.email, user.password);
    }

    signUp(user: any) {
        return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
    }

    sendRecoveryEmail(email: string) {
        return sendPasswordResetEmail(getAuth(), email);
    }

    LogOut() {
        this.auth.signOut().then(() => {
            this.router.navigateByUrl('/login');
        });
    }

    getUser() {
        return this.auth.authState;
    }
}