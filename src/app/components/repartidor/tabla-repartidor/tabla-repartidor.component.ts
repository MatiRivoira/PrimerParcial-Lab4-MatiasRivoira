import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-repartidor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-repartidor.component.html',
  styleUrl: './tabla-repartidor.component.css'
})
export class TablaRepartidorComponent {
  repartidores: any[] = [];
  @Output() repartidorSeleccionado = new EventEmitter<any>();

  firestoreSvc = inject(FirestoreService);

  constructor() { }

  ngOnInit(): void {
    this.loadRepartidores();
  }

  loadRepartidores() {
    this.firestoreSvc.getDocuments("repartidores").subscribe(
      data => this.repartidores = data,
      error => console.error('Error al cargar repartidores:', error)
    );
  }

  seleccionarRepartidor(repartidor: any) {
    this.repartidorSeleccionado.emit(repartidor);
  }
}
