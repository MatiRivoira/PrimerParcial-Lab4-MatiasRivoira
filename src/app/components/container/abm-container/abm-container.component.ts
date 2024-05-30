import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { BorrarContainerComponent } from '../borrar-container/borrar-container.component';
import { ModificarContainerComponent } from '../modificar-container/modificar-container.component';
import { CrearContainerComponent } from '../crear-container/crear-container.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ListadoContainersComponent } from '../listado-containers/listado-containers.component';
import { SweetAlertService } from '../../../services/sweetAlert.service';


@Component({
  selector: 'app-abm-container',
  standalone: true,
  imports: [CommonModule, BorrarContainerComponent, ModificarContainerComponent, CrearContainerComponent, ListadoContainersComponent],
  templateUrl: './abm-container.component.html',
  styleUrl: './abm-container.component.css'
})
export class AbmContainerComponent {
  helados: any[] = [];
  heladoSeleccionado: any;
  modo: 'crear' | 'modificar' | 'borrar' | null = null;
  private subscription!: Subscription;


  auth = inject(AuthService);
  constructor(private firestoreService: FirestoreService, private router: Router, private sweetalert:SweetAlertService) { }

  ngOnInit(): void {
    this.subscription = this.auth.getUser().subscribe((user: any) => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.firestoreService.getDocument("users", user.multiFactor.user.uid).subscribe(
          (data: any) => {
              if (data.userType === 'admin') {
                  console.log('Bienvenido Administrador!');
              } else {
                  console.log('Tipo de usuario no reconocido');
              }
          },
          (error: any) => {
              console.error('Error al cargar repartidores:', error);
          }
      );
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  actualizarRepartidor(repartidor: any) {
    this.heladoSeleccionado = repartidor;
    this.modo = repartidor.modo; // Suponiendo que `pais` es una propiedad del repartidor
  }


  agregarHelado(helado: any) {
    this.firestoreService.addDocument('containers', helado).then(
      () => {
        this.sweetalert.showSuccessAlert("Se subió con éxito el producto", "Éxito", "success")
      },
      error => {
        console.error('Error al agregar helado:', error);
      }
    );
  }

  modificarHelado(helado: any) {
    this.firestoreService.updateDocument('containers', helado.helado.id, helado).then(
      () => {
        this.sweetalert.showSuccessAlert("Se modifico con éxito el producto", "Éxito", "success")
      },
      error => {
        console.error('Error al actualizar helado:', error);
      }
    );
  }

  borrarHelado(id: string) {
    console.log(id);
    
    this.firestoreService.deleteDocument('containers', id).then(
      () => {
        this.sweetalert.showSuccessAlert("Se elimino con éxito el producto", "Éxito", "success")
      },
      error => {
        console.error('Error al eliminar helado:', error);
      }
    );
  }

  cancelar() {
    this.modo = null;
    this.heladoSeleccionado = null;
  }
}
