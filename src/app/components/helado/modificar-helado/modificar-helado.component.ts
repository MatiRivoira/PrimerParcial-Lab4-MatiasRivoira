import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar-helado',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modificar-helado.component.html',
  styleUrl: './modificar-helado.component.css'
})
export class ModificarHeladoComponent {
  @Input() helado: any;
  @Output() heladoModificado = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();
  heladoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.heladoForm = this.fb.group({
      tipo: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      peso: ['', [Validators.required, Validators.min(250), Validators.max(1000)]]
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
