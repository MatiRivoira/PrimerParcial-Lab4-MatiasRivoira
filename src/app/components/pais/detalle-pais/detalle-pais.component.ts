import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pais.component.html',
  styleUrl: './detalle-pais.component.css'
})
export class DetallePaisComponent {
  @Input() pais: any;
}
