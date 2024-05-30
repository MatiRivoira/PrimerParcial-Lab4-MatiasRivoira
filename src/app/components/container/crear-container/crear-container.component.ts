import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-container',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-container.component.html',
  styleUrl: './crear-container.component.css'
})
export class CrearContainerComponent {
  heladoForm: FormGroup;
  @Output() heladoCreado = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.heladoForm = this.fb.group({
      codigo: ['', Validators.required],
      color: ['', Validators.required],
      empresa: ['', [Validators.required]],
      capacidad: ['', [Validators.required]]
    });
  }

  crearHelado() {
    if (this.heladoForm.valid) {
      this.heladoCreado.emit(this.heladoForm.value);
      this.cancelar.emit();
    } else {
      console.log("Form invalid");
    }
  }
}
