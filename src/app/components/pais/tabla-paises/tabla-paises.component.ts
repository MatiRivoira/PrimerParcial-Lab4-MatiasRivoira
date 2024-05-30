import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountryService } from '../../../services/paises.service';
import { catchError, of, retry } from 'rxjs';

@Component({
  selector: 'app-tabla-paises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tabla-paises.component.html',
  styleUrls: ['./tabla-paises.component.css'],
})
export class TablaPaisesComponent {
  paises: any[] = [];

  @Output() paisSeleccionado = new EventEmitter<string>();

  showCountryList: boolean = false;
  paisSelected!: any;
  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    this.countryService
      .getCountries()
      .pipe(
        retry(10), // Reintenta la operación hasta 3 veces
        catchError((error) => {
          console.log('Error al cargar países:', error);
          return of([]); // Retorna un arreglo vacío si ocurre un error
        })
      )
      .subscribe((data: any[]) => {
        // Filtrar países de África y Europa
        this.paises = data.slice(0, 10); // Mostrar solo 10 países
      });
  }

  toggleCountryList() {
    event?.preventDefault();
    this.showCountryList = !this.showCountryList;
  }

  seleccionarPais(pais: any) {
    event?.preventDefault();
    this.paisSeleccionado.emit(pais);
    this.paisSelected = pais;
    this.toggleCountryList();
  }
}
