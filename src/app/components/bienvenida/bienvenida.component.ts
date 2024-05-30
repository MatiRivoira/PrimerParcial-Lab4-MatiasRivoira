import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {
  user: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://api.github.com/users/matirivoira').subscribe(data => {this.user = data, console.log(this.user);});
    
    
  }
}
