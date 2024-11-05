import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent  implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {}

  volver(){
    this.navCtrl.navigateForward(['/home'])
  }
}
