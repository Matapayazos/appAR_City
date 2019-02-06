webpackJsonp([1],{

/***/ 110:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 110;

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/crear-video/crear-video.module": [
		276,
		0
	],
	"../pages/intro/intro.module": [
		153
	],
	"../pages/mapa/mapa.module": [
		157
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 152;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntroPageModule", function() { return IntroPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var IntroPageModule = /** @class */ (function () {
    function IntroPageModule() {
    }
    IntroPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__intro__["a" /* IntroPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__intro__["a" /* IntroPage */]),
            ],
        })
    ], IntroPageModule);
    return IntroPageModule;
}());

//# sourceMappingURL=intro.module.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IntroPage = /** @class */ (function () {
    function IntroPage(navCtrl, socialSharing) {
        this.navCtrl = navCtrl;
        this.socialSharing = socialSharing;
        this.menssage = null;
        this.file = null;
        this.link = null;
        this.subject = null;
        this.pressi = 0;
        this.pressm = 0;
        this.pressp = 0;
        this.pressc = 0;
    }
    IntroPage.prototype.share = function () {
        this.socialSharing.share(this.menssage, this.subject, this.file, this.link)
            .then(function () {
        }).catch(function () {
        });
    };
    IntroPage.prototype.pressEvent1 = function (e) {
        this.pressi++;
    };
    IntroPage.prototype.pressEvent2 = function (e) {
        this.pressm++;
    };
    IntroPage.prototype.pressEvent3 = function (e) {
        this.pressp++;
    };
    IntroPage.prototype.pressEvent4 = function (e) {
        this.pressc++;
    };
    IntroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-intro',template:/*ion-inline-start:"/Users/alex/Documents/GitHub/appAR_City/src/pages/intro/intro.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Lugares</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="cards-bg">\n\n  <ion-card (tap)="pressEvent1($event)"> \n\n    <img src="assets/imgs/2.png"/>\n\n    <ion-card-content>\n      <ion-card-title>\n        Iglesias\n      </ion-card-title>\n      <p>\n        La cuidad de cuenca cuenta con una diversidad de iglesias las cuales se destacan por ser parte de un ambiente colonial.\n      </p>\n    </ion-card-content>\n\n    <ion-row no-padding>\n      <ion-col>\n        <button ion-button clear small color="danger" icon-start>\n          <ion-icon name=\'star\'></ion-icon>\n          Favorite:  {{pressi}} times\n        </button>\n      </ion-col>\n      <ion-col text-right>\n        <button ion-button clear small color="danger" icon-start>\n            <ion-icon name="share"></ion-icon>\n          Share\n   \n        </button>\n      </ion-col>\n    </ion-row>\n\n  </ion-card>\n\n  <ion-card (tap)="pressEvent2($event)" >\n\n    <div>\n      <img src="assets/imgs/1.png"/>\n    </div>\n\n    <ion-card-content>\n      <ion-card-title>\n        Museos\n      </ion-card-title>\n      <p>\n     Los museos muestran las historias ancestrales que aun perduran respecto al paso del tiempo.\n      </p>\n    </ion-card-content>\n\n    <ion-row no-padding>\n      <ion-col>\n        <button ion-button clear small color="danger" icon-start>\n          <ion-icon name=\'star\'></ion-icon>\n          Favorite:  {{pressm}} times\n        </button>\n      </ion-col>\n      <ion-col text-right>\n        <button ion-button clear small color="danger" icon-start>\n          <ion-icon name=\'share-alt\'></ion-icon>\n          Share\n        </button>\n      </ion-col>\n    </ion-row>\n\n  </ion-card>\n\n  <ion-card (tap)="pressEvent3($event)">\n\n    <div>\n      <img src="assets/imgs/4.png"/>\n    </div>\n\n    <ion-card-content>\n      <ion-card-title>\n        Parques\n      </ion-card-title>\n      <p>\n        Cuenca cuenta con una diversidad en flora y fauna esto permite que existan parques especializados en el cuidado de los animales.\n      </p>\n    </ion-card-content>\n\n    <ion-row no-padding>\n      <ion-col>\n        <button ion-button clear small color="danger" icon-start>\n          <ion-icon name=\'star\'></ion-icon>\n          Favorite:  {{pressp}} times\n        </button>\n      </ion-col>\n      <ion-col text-right>\n        <button ion-button clear small color="danger" icon-start>\n          <ion-icon name=\'share-alt\'></ion-icon>\n          Share\n        </button>\n      </ion-col>\n    </ion-row>\n\n  </ion-card>\n\n  <ion-card (tap)="pressEvent4($event)" >\n\n    <div>\n      <img src="assets/imgs/3.png"/>\n    </div>\n\n    <ion-card-content>\n      <ion-card-title >\n        Centro Historico\n      </ion-card-title >\n      <p>\n        El centro historico de la cuidad de cuenca brinda una restrospectiva de la epoca colonial.\n      </p>\n    </ion-card-content>\n\n    <ion-row no-padding>\n      <ion-col>\n        <button ion-button clear small color="danger" icon-start>\n          <ion-icon name=\'star\'></ion-icon>\n          Favorite:  {{pressc}} times\n        </button>\n      </ion-col>\n      <ion-col text-right>\n        <button ion-button clear small color="danger" icon-start (click)="share()" >\n          <ion-icon name=\'share-alt\'></ion-icon>\n          Share\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/alex/Documents/GitHub/appAR_City/src/pages/intro/intro.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], IntroPage);
    return IntroPage;
}());

//# sourceMappingURL=intro.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapaPageModule", function() { return MapaPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapa__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MapaPageModule = /** @class */ (function () {
    function MapaPageModule() {
    }
    MapaPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__mapa__["a" /* MapaPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__mapa__["a" /* MapaPage */]),
            ],
        })
    ], MapaPageModule);
    return MapaPageModule;
}());

//# sourceMappingURL=mapa.module.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_leaflet__);
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
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MapaPage = /** @class */ (function () {
    function MapaPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    MapaPage.prototype.ionViewDidEnter = function () {
        this.loadmap();
        console.log('ionViewDidLoad MapaPage');
    };
    MapaPage.prototype.loadmap = function () {
        var _this = this;
        this.map = __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a.map("map").fitWorld();
        __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Raja',
            maxZoom: 75
        }).addTo(this.map);
        this.map.locate({
            setView: true,
            maxZoom: 100
        }).on('locationfound', function (e) {
            //console.log('Your Location has been found');
            var markerGroup = __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a.featureGroup();
            var mark = __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a.marker([e.latitude, e.longitude]).on('click', function () {
                alert('Marker clicked');
            });
            markerGroup.addLayer(mark);
            _this.map.addLayer(markerGroup);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], MapaPage.prototype, "mapContainer", void 0);
    MapaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mapa',template:/*ion-inline-start:"/Users/alex/Documents/GitHub/appAR_City/src/pages/mapa/mapa.html"*/'<!--\n  Generated template for the MapaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>mapa</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n<div id="map" style="height: 100%; width: 100%;"></div>\n</ion-content>\n'/*ion-inline-end:"/Users/alex/Documents/GitHub/appAR_City/src/pages/mapa/mapa.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], MapaPage);
    return MapaPage;
}());

//# sourceMappingURL=mapa.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__intro_intro__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mapa_mapa__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, http) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.nombre = " ";
        this.initializeItems();
    }
    HomePage.prototype.itemSelected = function (item) {
        var _this = this;
        //this.consultarWikipedia(item);
        var cabecera = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json'
        });
        var opciones = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: cabecera });
        this.http.get('http://localhost:8080/Tesis/srv/' + item + '/list', opciones)
            .map(function (res) { return res.json(); })
            .subscribe(function (datos) {
            console.log(datos);
            _this.resultados = datos;
        }), function (err) {
            console.log("Error" + err);
        };
    };
    HomePage.prototype.GoMapa = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__mapa_mapa__["a" /* MapaPage */]);
    };
    HomePage.prototype.GoIntro = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__intro_intro__["a" /* IntroPage */]);
    };
    HomePage.prototype.initializeItems = function () {
        this.items = ["videos", "personas", "items", "Lugares", "historias"];
    };
    HomePage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the ev target
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/alex/Documents/GitHub/appAR_City/src/pages/home/home.html"*/'\n<ion-header>\n<ion-navbar>\n<ion-title>\n             Cuenca-ARS\n</ion-title>\n</ion-navbar>\n</ion-header>\n<ion-content padding>\n    <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>\n        <ion-list>\n            <button  class="button" ion-item *ngFor="let item of items" (click)="itemSelected(item)">\n                <li> {{ item }}</li>\n            </button> \n         </ion-list>\n  <h1>Descubrir</h1> \n    <ion-list >\n        <button ion-item *ngFor="let resultado of resultados" >\n         {{resultado.nombre}} : {{resultado.descripcion}}\n        </button>\n     </ion-list>\n  \n<button ion-button color="light" (click)="GoIntro()"><ion-icon name="albums"></ion-icon> </button>\n\n<button ion-button color="light" (click)="GoMapa()"> <ion-icon  name="map"></ion-icon> </button>\n</ion-content>\n'/*ion-inline-end:"/Users/alex/Documents/GitHub/appAR_City/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(225);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_intro_intro_module__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_social_sharing__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_mapa_mapa_module__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5__pages_intro_intro_module__["IntroPageModule"],
                __WEBPACK_IMPORTED_MODULE_10__pages_mapa_mapa_module__["MapaPageModule"],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/crear-video/crear-video.module#CrearVideoPageModule', name: 'CrearVideoPage', segment: 'crear-video', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/intro/intro.module#IntroPageModule', name: 'IntroPage', segment: 'intro', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mapa/mapa.module#MapaPageModule', name: 'MapaPage', segment: 'mapa', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_social_sharing__["a" /* SocialSharing */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/alex/Documents/GitHub/appAR_City/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/alex/Documents/GitHub/appAR_City/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[202]);
//# sourceMappingURL=main.js.map