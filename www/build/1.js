webpackJsonp([1],{

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CrearVideoPageModule", function() { return CrearVideoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__crear_video__ = __webpack_require__(280);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CrearVideoPageModule = /** @class */ (function () {
    function CrearVideoPageModule() {
    }
    CrearVideoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__crear_video__["a" /* CrearVideoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__crear_video__["a" /* CrearVideoPage */]),
            ],
        })
    ], CrearVideoPageModule);
    return CrearVideoPageModule;
}());

//# sourceMappingURL=crear-video.module.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CrearVideoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the CrearVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CrearVideoPage = /** @class */ (function () {
    function CrearVideoPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.resultados = "";
        this.codigo = "";
        this.descripcion = "";
        this.nombre = "";
        this.ruta = "";
        this.data = " codigo : 5 , descripcion : Un video de la Maria Auxiliadora , nombre : Maria Auxiliadora , ruta: /hola/jojo/mojo/lolo/Maria Auxiliadora.mp4 ";
    }
    CrearVideoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CrearVideoPage');
    };
    CrearVideoPage.prototype.add = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post("http://localhost:8080/Tesis/srv/videos/insert", data)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    CrearVideoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-crear-video',template:/*ion-inline-start:"/Users/alex/Documents/GitHub/appAR_City/src/pages/Mostar_video/crear-video.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Crearcion de Video</ion-title>\n  </ion-navbar>\n</ion-header>\n  <ion-list>\n\n  <ion-item >\n  <ion-label floating>Codigo:</ion-label>\n  <ion-input type="text" value="" [(ngModel)]="codigo"></ion-input>\n  </ion-item>\n  <ion-item>\n  <ion-label floating>Decripcion:</ion-label>\n  <ion-input type="text" value="" [(ngModel)]="descripcion"></ion-input>\n  </ion-item>\n  <ion-item>\n  <ion-label floating>Nombre:</ion-label>\n  <ion-input type="text" value="" [(ngModel)]="nombre"></ion-input>\n  </ion-item>\n  <ion-item>\n  <ion-label floating>Ruta:</ion-label>\n  <ion-input type="text" value="" [(ngModel)]="ruta"></ion-input>\n  </ion-item>\n\n  <button ion-button color="light" (click)="add()">Crear</button>\n\n  </ion-list>'/*ion-inline-end:"/Users/alex/Documents/GitHub/appAR_City/src/pages/Mostar_video/crear-video.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], CrearVideoPage);
    return CrearVideoPage;
}());

//# sourceMappingURL=crear-video.js.map

/***/ })

});
//# sourceMappingURL=1.js.map