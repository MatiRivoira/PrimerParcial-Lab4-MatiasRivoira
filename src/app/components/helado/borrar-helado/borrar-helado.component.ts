import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-borrar-helado',
  standalone: true,
  imports: [],
  templateUrl: './borrar-helado.component.html',
  styleUrl: './borrar-helado.component.css'
})
export class BorrarHeladoComponent {
  @Input() helado: any;
  @Output() heladoBorrado = new EventEmitter<number>();
  @Output() cancelar = new EventEmitter<void>();

  borrarHelado() {
    this.heladoBorrado.emit(this.helado.id);
    this.cancelar.emit();
  }
}
