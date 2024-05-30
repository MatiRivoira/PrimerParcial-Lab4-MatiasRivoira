import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

//?Firebase Authentication
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyB48Efk0VQquHIIO7UB6ai2fWWu_TO3Qfw",
  authDomain: "posible-parcial.firebaseapp.com",
  projectId: "posible-parcial",
  storageBucket: "posible-parcial.appspot.com",
  messagingSenderId: "606689585377",
  appId: "1:606689585377:web:a6c0606f52b95bf9612fa0"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(
      AngularFireModule.initializeApp(firebaseConfig),
      HttpClientModule,
      AngularFirestoreModule
    )
  ]
};
