// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  facebook: {
    clientId: '2880596572038563',
    clientSecret: '7ebe22baa22002c50503bfce87ed19d9'
  },
  google: {
    clientId: '539037543041-lj1s52blklduqff1ee7qcorjh92g50i6.apps.googleusercontent.com',
    clientSecret: 'nXnukOI3wHJjPFh8fOcgZDtv'
  },
  url_backend: 'https://viruscontroluy.xyz:8443/viruscontrol-web/rest',
  firebase: {
    apiKey: 'AIzaSyAEFI0IB3lsyB4oc9btLYfeegmnx-n7Q60',
    authDomain: 'virus-control-uy-gr14.firebaseapp.com',
    databaseURL: 'https://virus-control-uy-gr14.firebaseio.com',
    projectId: 'virus-control-uy-gr14',
    storageBucket: 'virus-control-uy-gr14.appspot.com',
    messagingSenderId: '339927537433',
    appId: '1:339927537433:web:cc50f95f899110f0369788',
    measurementId: 'G-YS4MGBY9H1'
  },
  googleMapsKey: 'AIzaSyD38dBuTFAh_xGH8SWEpPMyc7-bBeVVSfo'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
// url_backend: 'http://192.168.0.101:8080/viruscontrol-web/rest',
