import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-check-alumn',
  templateUrl: './check-alumn.page.html',
  styleUrls: ['./check-alumn.page.scss'],
})
export class CheckAlumnPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() { 
    setTimeout(()=>{
      this.navCtrl.navigateForward(['/asis-alumn']) 
    },2300)
  }
}
