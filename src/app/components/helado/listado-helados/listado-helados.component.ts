import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { BorrarHeladoComponent } from '../borrar-helado/borrar-helado.component';
import { ModificarHeladoComponent } from '../modificar-helado/modificar-helado.component';
import { CrearHeladoComponent } from '../crear-helado/crear-helado.component';
import { CommonModule } from '@angular/common';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-listado-helados',
  standalone: true,
  imports: [CommonModule, BorrarHeladoComponent, ModificarHeladoComponent, CrearHeladoComponent],
  templateUrl: './listado-helados.component.html',
  styleUrl: './listado-helados.component.css'
})
export class ListadoHeladosComponent implements OnInit, OnDestroy {
  helados: any[] = [];
  heladoSeleccionado: any;
  modo: 'crear' | 'modificar' | 'borrar' | null = null;
  private subscription!: Subscription;

  auth = inject(AuthService);
  constructor(private firestoreService: FirestoreService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.auth.getUser().subscribe((user: any) => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.firestoreService.getDocument("users", user.multiFactor.user.uid).subscribe(
          (data: any) => {
              if (data.userType === 'admin') {
                  console.log('Bienvenido Administrador!');
                  this.loadHelados();
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

  loadHelados() {
    this.firestoreService.getDocuments('helados').subscribe(
      (data: any[]) => {
        this.helados = data;
      },
      error => {
        console.error('Error al cargar helados:', error);
      }
    );
  }

  seleccionarHelado(helado: any, modo: 'modificar' | 'borrar') {
    this.heladoSeleccionado = helado;
    this.modo = modo;
  }

  agregarHelado(helado: any) {
    this.firestoreService.addDocument('helados', helado).then(
      () => {
        this.loadHelados();
      },
      error => {
        console.error('Error al agregar helado:', error);
      }
    );
  }

  modificarHelado(helado: any) {
    this.firestoreService.updateDocument('helados', helado.id, helado).then(
      () => {
        this.loadHelados();
      },
      error => {
        console.error('Error al actualizar helado:', error);
      }
    );
  }

  borrarHelado(id: string) {
    this.firestoreService.deleteDocument('helados', id).then(
      () => {
        this.loadHelados();
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
