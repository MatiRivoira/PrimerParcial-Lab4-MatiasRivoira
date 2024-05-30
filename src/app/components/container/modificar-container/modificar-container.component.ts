import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar-container',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modificar-container.component.html',
  styleUrl: './modificar-container.component.css'
})
export class ModificarContainerComponent {
  @Input() helado: any;
  @Output() heladoModificado = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();
  heladoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.heladoForm = this.fb.group({
      codigo: ['', Validators.required],
      color: ['', Validators.required],
      empresa: ['', [Validators.required]],
      capacidad: ['', [Validators.required]]
    });
  }

  ngOnChanges(): void {
    if (this.helado) {
      this.heladoForm.patchValue({
        tipo: this.helado.tipo,
        precio: this.helado.precio,
        peso: this.helado.peso
      });
    }
  }

  modificarHelado() {
    if (this.heladoForm.valid) {
      const heladoModificado = { ...this.helado, ...this.heladoForm.value };
      this.heladoModificado.emit(heladoModificado);
      this.cancelar.emit();
    }
  }
}
