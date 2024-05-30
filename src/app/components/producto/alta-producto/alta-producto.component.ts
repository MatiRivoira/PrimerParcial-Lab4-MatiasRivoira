import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirestoreService } from '../../../services/firestore.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { TablaPaisesComponent } from '../../pais/tabla-paises/tabla-paises.component';
import { SweetAlertService } from '../../../services/sweetAlert.service';

@Component({
  selector: 'app-alta-producto',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, TablaPaisesComponent],
  templateUrl: './alta-producto.component.html',
  styleUrl: './alta-producto.component.css'
})
export class AltaProductoComponent {
  paisRecibo: any[] = [];
  forma?: FormGroup | any;
  selectedPais: any = null;

  firestoreSvc = inject(FirestoreService);

  auth = inject(AuthService);
  private subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sweetalert:SweetAlertService
  ) {
    this.forma = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, Validators.required],
      stock: [0, Validators.required],
      comestible: [''],
    });
  }

  ngOnInit(): void {
    this.subscription = this.auth.getUser().subscribe((user) => {
      if (!(user && user.email)) {
        this.router.navigate(['/login']);
      }
    });
  }

  seleccionarPais(paisNombre: any): void {
    this.selectedPais = paisNombre;
  }

  onSubmit(): void {
    if (this.forma.valid && this.selectedPais) {
      const repartidorData = {
        ...this.forma.value,
        pais: this.selectedPais,
      };
      this.firestoreSvc
        .addDocument('productos', repartidorData)
        .then(() => this.sweetalert.showSuccessAlert("Se subió con éxito el producto", "Éxito", "success"))
        .catch(() => this.sweetalert.showSuccessAlert("No se ha podido subir el producto", "Error", "error"));
    } else {
      console.error('Formulario inválido o país no seleccionado');
    }
  }
}
