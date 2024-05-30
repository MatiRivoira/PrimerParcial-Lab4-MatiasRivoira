import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { BorrarContainerComponent } from '../borrar-container/borrar-container.component';
import { ModificarContainerComponent } from '../modificar-container/modificar-container.component';
import { CrearContainerComponent } from '../crear-container/crear-container.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-listado-containers',
  standalone: true,
  imports: [CommonModule, BorrarContainerComponent, ModificarContainerComponent, CrearContainerComponent],
  templateUrl: './listado-containers.component.html',
  styleUrl: './listado-containers.component.css'
})
export class ListadoContainersComponent {
  helados: any[] = [];
  heladoSeleccionado: any;
  modo: 'crear' | 'modificar' | 'borrar' | null = null;
  private subscription!: Subscription;

  @Output() repartidorSeleccionado = new EventEmitter<any>();

  auth = inject(AuthService);
  constructor(private firestoreService: FirestoreService, private router: Router) { }

  ngOnInit(): void {
    this.loadHelados();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadHelados() {
    this.firestoreService.getDocuments('containers').subscribe(
      (data: any[]) => {
        this.helados = data;
      },
      error => {
        console.error('Error al cargar containers:', error);
      }
    );
  }

  seleccionarHelado(helado: any, modo: 'modificar' | 'borrar') {
    this.repartidorSeleccionado.emit({helado: helado, modo: modo});
  }
}
