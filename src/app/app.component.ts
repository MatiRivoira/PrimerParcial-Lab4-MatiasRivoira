import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { filter } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private router: Router, private titleService: Title) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Obtener el título correspondiente a la ruta
      const title = this.getTitleFromRoute(event.url);
      // Establecer el título de la página
      this.titleService.setTitle(title);
    });
  }

  // Función para obtener el título correspondiente a la ruta
  getTitleFromRoute(url: string): string {
    switch (url) {
      case '/bienvenida':
        return 'Bienvenida | Primer Parcial';
      case '/login':
        return 'Iniciar sesión | Primer Parcial';
      case '/register':
        return 'Crear cuenta | Primer Parcial';
      case '/forgot-password':
        return 'Recuperar Contraseña | Primer Parcial';
      case '/alta-repartidor':
        return 'Alta de Repartidor | Primer Parcial';
      case '/listado-repartidores':
        return 'Listado de Repartidores | Primer Parcial';
      case '/listado-helados':
        return 'Listado de Helados | Primer Parcial';
      default:
        return 'Primer Parcial';
    }
  }
}
