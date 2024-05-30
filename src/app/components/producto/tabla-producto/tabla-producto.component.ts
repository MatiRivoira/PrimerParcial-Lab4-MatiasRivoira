import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-producto.component.html',
  styleUrl: './tabla-producto.component.css'
})
export class TablaProductoComponent {
  repartidores: any[] = [];
  @Input() where?: boolean = false;
  @Output() repartidorSeleccionado = new EventEmitter<any>();

  firestoreSvc = inject(FirestoreService);

  constructor() { }

  ngOnInit(): void {
    this.loadRepartidores();
  }

  loadRepartidores() {
    
    if (this.where) {
      this.firestoreSvc.getDocumentsWhere("productos", "stock", 0).subscribe(
        data => this.repartidores = data,
        error => console.error('Error al cargar repartidores:', error)
      );
    } else {
      this.firestoreSvc.getDocuments("productos").subscribe(
        data => this.repartidores = data,
        error => console.error('Error al cargar repartidores:', error)
      );
    }
  }

  seleccionarRepartidor(repartidor: any) {
    this.repartidorSeleccionado.emit(repartidor);
  }
}
