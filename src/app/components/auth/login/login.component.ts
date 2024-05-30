import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  showPassword: boolean = false;
  errMsgEmail!:string;
  errorStates = { email: false, pass: false };
  errMsg!:string;
  accesoRapido!:boolean;
  ngEmail!:string;
  ngPass!:string;
  errMsgPass!:string;

  toggleAccesoRapido():void{
    this.accesoRapido = !this.accesoRapido;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(private titleService: Title, private router:Router) {
    this.titleService.setTitle("Iniciar sesión | Sala de juegos");
  }

  ngOnInit(): void {
    this.authService.LogOut()
  }

  //?Login with firebase
  authService = inject(AuthService);
  firestoreService = inject(FirestoreService);

  async onSubmit(formData: any){
    this.errorStates = { email: false, pass: false };
    this.errMsgEmail = "";
    this.errMsg = "";
    this.errMsgPass = "";
    
    if (formData) {
      this.authService.singIn(formData)
      .then((resp:any) => {
        this.router.navigateByUrl("/bienvenida");
      })
      .catch(err => {
        console.log(err);
        switch(err.code){
          case "auth/invalid-email":
            this.errMsgEmail = "Ingrese un correo electronico valido."
            this.errorStates.email = true;
            break;
          case "auth/invalid-credential":
            this.errMsg = "Correo y/o contraseña incorrecta."
            this.errorStates.email = true;
            this.errorStates.pass = true;
            break;
          case "auth/missing-email":
            this.errMsgEmail = "Ingrese el correo electronico.";
            this.errorStates.email = true;
            this.errMsgPass = "Ingrese la contraseña";
            this.errorStates.pass = true;
            break;
        }
      });
    }
  }

  autoFill(user:string) : void {
    switch (user) {
      case "user1":
        this.ngEmail = 'mgrivoira26@gmail.com';
        this.ngPass = 'banana22';
        break;
      case "user2":
        this.ngEmail = 'krysa3d@krysa3d.com';
        this.ngPass = 'haceTuPropioFunkoPersonalizado#ad';
        break;
    }
  }

  esperarYRedirigir(storage:string, detalle:any, url:string, intervalo:number = 50) {
    const idIntervalo = setInterval(() => {
        sessionStorage.setItem(storage, detalle);
        if (sessionStorage.getItem(storage) == detalle) {
            clearInterval(idIntervalo);
            this.router.navigateByUrl(url);
        }
    }, intervalo);
  }
}
