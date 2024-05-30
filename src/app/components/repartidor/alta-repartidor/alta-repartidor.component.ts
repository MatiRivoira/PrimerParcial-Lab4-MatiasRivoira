import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TablaPaisesComponent } from '../../pais/tabla-paises/tabla-paises.component';
import { FirestoreService } from '../../../services/firestore.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alta-repartidor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TablaPaisesComponent,
  ],
  templateUrl: './alta-repartidor.component.html',
  styleUrl: './alta-repartidor.component.css',
})
export class AltaRepartidorComponent implements OnInit {
  paises: any[] = [];
  repartidorForm: FormGroup;
  selectedPais: any = null;

  firestoreSvc = inject(FirestoreService);

  auth = inject(AuthService);
  private subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private router: Router
  ) {
    this.repartidorForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18)]],
      dni: ['', Validators.required],
      capacidad: ['', Validators.required],
      unidadPropia: [''],
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
    if (this.repartidorForm.valid && this.selectedPais) {
      const repartidorData = {
        ...this.repartidorForm.value,
        pais: this.selectedPais,
      };
      this.firestoreSvc
        .addDocument('repartidores', repartidorData)
        .then(() => console.log('Repartidor añadido exitosamente'))
        .catch((error) => console.error('Error al añadir repartidor:', error));
    } else {
      console.error('Formulario inválido o país no seleccionado');
    }
  }
}
