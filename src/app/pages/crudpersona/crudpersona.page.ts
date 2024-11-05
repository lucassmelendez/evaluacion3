import { Component, OnInit } from '@angular/core';
//Importar
import { Persona } from 'src/app/model/Persona';
import { PersonasService } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-crudpersona',
  templateUrl: './crudpersona.page.html',
  styleUrls: ['./crudpersona.page.scss'],
})
export class CrudpersonaPage implements OnInit {

  constructor(private cp:PersonasService) { }

  persona:Persona={nombre:'', apellido:''}

  ngOnInit() {
  }
  grabar(){
    this.cp.grabar(this.persona).then(()=>{
      alert("grabo")
    }).catch((err)=>{
      console.log(err);
    })
  }

  eliminar(id:any){
    this.cp.eliminar(id).then(()=>{
      alert("elimino")
    }).catch((err)=>{
      console.log(err)
    })
  }
}
