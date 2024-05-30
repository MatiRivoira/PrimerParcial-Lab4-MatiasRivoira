import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-helado',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-helado.component.html',
  styleUrl: './crear-helado.component.css'
})
export class CrearHeladoComponent {
  heladoForm: FormGroup;
  @Output() heladoCreado = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.heladoForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      peso: ['', [Validators.required, Validators.min(250), Validators.max(1000)]]
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
