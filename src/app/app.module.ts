import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { firebaseConfig } from './app.firebase';
import { AuthProvider } from './services/auth/auth';
import { ProductManagementProvider } from './services/product-management/product-management';
import { IonicStorageModule } from '@ionic/storage'
import { RequestProvider } from './services/request/request';
import { ChatProvider } from './services/chat/chat';
import { ImghandlerProvider } from './services/imghandler/imghandler';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { RouteReuseStrategy } from '@angular/router';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ExtrasService } from './extras.service';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    StatusBar,
    Camera,
    AngularFireAuth,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} },
    SplashScreen,
    AuthProvider,
    AngularFireDatabase,
    ProductManagementProvider,
    RequestProvider,
    ChatProvider,
    ImghandlerProvider,
    ExtrasService

  ]
})
export class AppModule { }
