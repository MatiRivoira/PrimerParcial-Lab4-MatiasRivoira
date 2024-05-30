import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-repartidor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-repartidor.component.html',
  styleUrl: './detalle-repartidor.component.css'
})
export class DetalleRepartidorComponent {
  @Input() repartidor: any;
}
