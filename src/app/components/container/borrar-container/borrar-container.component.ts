import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-borrar-container',
  standalone: true,
  imports: [],
  templateUrl: './borrar-container.component.html',
  styleUrl: './borrar-container.component.css'
})
export class BorrarContainerComponent {
  @Input() helado: any;
  @Output() heladoBorrado = new EventEmitter<number>();
  @Output() cancelar = new EventEmitter<void>();

  borrarHelado() {
    this.heladoBorrado.emit(this.helado.id);
    this.cancelar.emit();
  }
}
