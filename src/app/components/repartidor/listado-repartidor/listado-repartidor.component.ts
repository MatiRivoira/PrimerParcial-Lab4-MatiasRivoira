import { Component, OnInit, inject } from '@angular/core';
import { TablaRepartidorComponent } from '../tabla-repartidor/tabla-repartidor.component';
import { DetalleRepartidorComponent } from '../detalle-repartidor/detalle-repartidor.component';
import { DetallePaisComponent } from '../../pais/detalle-pais/detalle-pais.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado-repartidor',
  standalone: true,
  imports: [TablaRepartidorComponent, DetalleRepartidorComponent, DetallePaisComponent],
  templateUrl: './listado-repartidor.component.html',
  styleUrl: './listado-repartidor.component.css'
})
export class ListadoRepartidorComponent implements OnInit {
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
