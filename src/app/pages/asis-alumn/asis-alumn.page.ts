import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/model/alumno';
import { Persona } from 'src/app/model/Persona';
import { PersonasService } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-asis-alumn',
  templateUrl: './asis-alumn.page.html',
  styleUrls: ['./asis-alumn.page.scss'],
})
export class AsisAlumnPage implements OnInit {

  students = [
    { name: 'Juan Pérez', attendance: 85, present: false },
    { name: 'María García', attendance: 0, present: false },
    { name: 'Pedro López', attendance: 78, present: false },
    { name: 'Ana Martínez', attendance: 95, present: false },
    { name: 'Luis Hernández', attendance: 80, present: false },
    { name: 'Francisco Silva', attendance: 30, present: false },
    { name: 'Hector Alveal', attendance: 90, present: false },
    { name: 'Omar Alveal', attendance: 78, present: false },
    { name: 'Benjamin Alveak', attendance: 95, present: false },
    { name: 'Pedro Ahumada', attendance: 80, present: false },
    { name: 'Benjamin Bahamondes', attendance: 100, present: false },
    { name: 'Ignacio Urrutia', attendance: 90, present: false },
    { name: 'Kristal Huribe', attendance: 78, present: false },
    { name: 'Alan Gajardo', attendance: 95, present: false },
    { name: 'Diego Plaza', attendance: 40, present: false },
    { name: 'Matías Recabarren', attendance: 85, present: false },
    { name: 'Alonso Gonzales', attendance: 10, present: false },
    { name: 'Sebastián Piñera', attendance: 78, present: false },
    { name: 'Maria Jose', attendance: 95, present: false },
    { name: 'José María', attendance: 80, present: false },
  ];
  
  constructor(private cp:PersonasService) { }

  lista_alumno:Alumno[]=[]

  ngOnInit() {
    this.listar()
  }

  listar(){
    this.cp.listarTodo().subscribe(data=>{this.lista_alumno=data})
  }
  eliminar(id:any){
    this.cp.eliminar(id).then(()=>{
      alert("Se Elimino al Estudiante")
    }).catch((err)=>{
      console.log(err)
    })
  }

}
