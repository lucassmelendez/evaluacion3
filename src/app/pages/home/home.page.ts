import { Component, OnInit } from '@angular/core';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  usuario: string = '';

  constructor(private crud:CrudAPIService) {}

  ngOnInit(): void {
    const x = localStorage.getItem("usuario");
    this.usuario = x ?? '';
  }

  capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  recuperaralumno(){
    this.crud.getAlumno().subscribe(
      (resp)=>{
        console.log(resp)
      }
    ) 
  }
}