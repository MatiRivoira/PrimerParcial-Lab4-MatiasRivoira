import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navDownStyle: { [key: string]: string } = { };
  buttonStyle: { [key: string]: string } = { 'background-image': `url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");`,};
  pulse:boolean = false;

  currentRoute: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    // Suscripción al evento de cambio de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  // Función para asignar la clase "active" dinámicamente al enlace
  isActiveRoute(route: string): boolean {
    return this.currentRoute === route;
  }

  togleNav(){
    this.pulse = !this.pulse;
    if (this.pulse) {
      this.navDownStyle = { 'display': 'block' };
      this.buttonStyle = { 'background-image': `url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M6 6l18 18M6 24L24 6'/%3E%3C/svg%3E")` };
    } else {
      this.navDownStyle = { 'display': 'none' };
      this.buttonStyle = { 'background-image': `url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E")` };
    }
  }
}
