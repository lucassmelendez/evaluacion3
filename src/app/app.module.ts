import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './servicios/auth.service';
//Librerias:
import { environment } from 'src/environments/environment.prod'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AngularFireModule } from '@angular/fire/compat'
import { QrCodeModule } from 'ng-qrcode';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, IonicModule.forRoot(), 
    AppRoutingModule,ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    QrCodeModule, HttpClientModule, 
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      AuthService,
     provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
