import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { PersonasService } from 'src/app/servicios/personas.service'; 
@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.page.html',
  styleUrls: ['./confirm-code.page.scss'],
})
export class ConfirmCodePage implements OnInit {

  codigo: string = '123';
  password: string = '';
  password2: string = '';
  correo: string = ''; 

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private alertController: AlertController,
    private personasService: PersonasService 
  ) {}

  ngOnInit() {
    
  }

}
