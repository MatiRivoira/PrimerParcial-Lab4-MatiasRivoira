import { Component, OnInit, inject } from '@angular/core';
import { TablaProductoComponent } from '../tabla-producto/tabla-producto.component';
import { DetalleProductoComponent } from '../detalle-producto/detalle-producto.component';
import { DetallePaisComponent } from '../../pais/detalle-pais/detalle-pais.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado-publico',
  standalone: true,
  imports: [TablaProductoComponent, DetalleProductoComponent, DetallePaisComponent],
  templateUrl: './listado-publico.component.html',
  styleUrl: './listado-publico.component.css'
})
export class ListadoPublicoComponent {
  repartidorSeleccionado: any;
  paisSeleccionado: any;

  auth = inject(AuthService);
  router = inject(Router);
  private subscription!: Subscription;

  actualizarRepartidor(repartidor: any) {
    this.repartidorSeleccionado = repartidor;
    this.paisSeleccionado = repartidor.pais; // Suponiendo que `pais` es una propiedad del repartidor
  }
}
