import { Component, OnInit, inject } from '@angular/core';
import { TablaProductoComponent } from '../tabla-producto/tabla-producto.component';
import { DetalleProductoComponent } from '../detalle-producto/detalle-producto.component';
import { DetallePaisComponent } from '../../pais/detalle-pais/detalle-pais.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [TablaProductoComponent, DetalleProductoComponent, DetallePaisComponent],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent implements OnInit {
  repartidorSeleccionado: any;
  paisSeleccionado: any;

  auth = inject(AuthService);
  router = inject(Router);
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.auth.getUser().subscribe((user) => {
      if (!(user && user.email)) {
        this.router.navigate(['/login']);
      }
    });
  }

  actualizarRepartidor(repartidor: any) {
    this.repartidorSeleccionado = repartidor;
    this.paisSeleccionado = repartidor.pais; // Suponiendo que `pais` es una propiedad del repartidor
  }
}
