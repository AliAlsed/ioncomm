import { Component, OnInit } from "@angular/core";
import {
  NavController,
  NavParams,
  ToastController,
  LoadingController
} from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { AuthProvider } from ".././services/auth/auth";
import $ from "jquery";
import * as firebase from "firebase/app";
import { Storage } from "@ionic/storage";
import { ProductManagementProvider } from ".././services/product-management/product-management";
import { ActivatedRoute } from "@angular/router";

/**
 * Generated class for the BuyProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: "buy-products",
  templateUrl: "./buy-products.html",
  styleUrls: ["./buy-products.scss"]
})
export class BuyProductsPage implements OnInit {
  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.paramMap.get("id"));
    var navh = $(".header").innerHeight();
    this.storage
      .get("id")
      .then(userid => {
        console.log(" users : " + userid);
        this.uuid = userid;
      })
      .then(() => {
        console.log("uuid" + this.uuid);
      });
  }
  uuid = "";
  address: string;
  status = "";
  name: string;
  price: number;
  desc: string;
  constructor(
    public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    public toast: ToastController,
    private camera: Camera,
    private storage: Storage,
    public load: LoadingController,
    public af: AuthProvider,
    public PMP: ProductManagementProvider
  ) {}
  imageurl = "";
  imagecheck = false;

  mySelectedPhoto;
  loading;
  currentPhoto;
  imgSource;

  addfod() {
    // if (this.imageurl.length < 1) {
    //   this.imageurl = 'https://corporate.oriflame.com/Global/Images%20achive/Products/Bioclinic_hr.jpg';
    // }
    this.PMP.addProducts(
      this.activatedRoute.snapshot.paramMap.get("id"),
      this.uuid,
      this.name,
      this.price,
      this.desc,
      this.imageurl,
      this.status
    )
      .then(product => {
        this.presentToast("تم نشر");
        //this.navCtrl.popToRoot();
      })
      .then(() => {
        //this.navCtrl.popToRoot();
      });
    console.log(this.status);
  }
  takePhoto() {
    const options: CameraOptions = {
      targetHeight: 720,
      targetWidth: 720,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options).then(
      imageData => {
        this.loading = this.load.create({
          message: "جاري اضافة الصورة ",
          cssClass: "setdire"
        });
        this.loading.present();
        this.mySelectedPhoto = this.dataURLtoBlob(
          "data:image/jpeg;base64," + imageData
        );
        this.upload();
      },
      err => {
        alert(JSON.stringify(err));
      }
    );
  }

  private async presentToast(message) {
    const toast = await this.toast.create({
      message,
      duration: 3000,
      cssClass: "setdire"
    });
    toast.present();
  }

  dataURLtoBlob(myURL) {
    let binary = atob(myURL.split(",")[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
  }

  upload() {
    var char = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v"
    ];
    var rand1 = Math.floor(Math.random() * char.length);
    var rand2 = Math.floor(Math.random() * char.length);
    var rand3 = Math.floor(Math.random() * char.length);
    var rand4 = Math.floor(Math.random() * char.length);
    var rand = char[rand1] + char[rand2] + char[rand3] + char[rand4];

    if (this.mySelectedPhoto) {
      var uploadTask = firebase
        .storage()
        .ref()
        .child("images/" + rand + ".jpg");
      var put = uploadTask.put(this.mySelectedPhoto);
      put.then(() => {
        this.loading.dismiss();

        uploadTask.getDownloadURL().then(url => {
          this.imagecheck = true;
          this.imageurl = url;
        });
      });

      put.catch(err => {
        this.loading.dismiss();

        alert(JSON.stringify(err));
      });
    }
  }
  show() {
    if (this.status.length <= 1) {
      return true;
    } else {
      return false;
    }
  }
}
