import {
  Component,
  OnInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  mensajeConfirmacion,
  confirmacionUsuario,
} from '@shared/utils/sweet-alert';
import { AuxiliaresService } from '@shared/services/auxiliares.service';

declare var paypal;

@Component({
  selector: 'app-donaciones',
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.scss'],
})
export class DonacionesComponent implements OnInit {
  constructor(private auxiliaresServices: AuxiliaresService) {}

  finalAmount: number = 1;
  aux: number;

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  product = {
    price: this.finalAmount,
    description: 'Donación a VirusControlUY',
    img: 'srcassetsicon-virus-control-uy-small.png',
  };

  paidFor = false;
  mostrarDonar = true;
  montoTotal = 0;

  ngOnInit() {



    this.auxiliaresServices.getDonaciones().subscribe((data) => {
      const donacionFirebase: any = data.map((e) => {
        console.log('data: ', e.payload.doc.data());
        this.montoTotal = 0;
        return e.payload.doc.data();
      });


      for (const donacion of donacionFirebase) {
        // tslint:disable-next-line: radix
        this.montoTotal += parseInt(donacion.donacion) ;
      }


    });


    // paypal
    // .Buttons({
    //   createOrder: (data, actions) => {
    //     return actions.order.create({
    //       purchase_units: [
    //         {
    //           description: this.product.description,
    //           amount: {
    //             currency_code: 'USD',
    //             value: this.product.price
    //           }
    //         }
    //       ]
    //     });
    //   },
    //   onApprove: async (data, actions) => {
    //     const order = await actions.order.capture();
    //     this.paidFor = true;
    //     console.log(order);
    //     mensajeConfirmacion('Gracias!', 'Tu donación ayudará a mejorar la plataforma.');
    //   },
    //   onError: err => {
    //     console.log(err);
    //   }
    // })
    // .render(this.paypalElement.nativeElement);
  }

  donar() {
    confirmacionUsuario(
      'Donación a VirusControlUy',
      'Se desplegará el boton de Paypal, para realizar la donación. Confirma continuar?'
    ).then((res: any) => {
      console.log('res: ', res);
      console.log('finalAmount: ', this.finalAmount);
      if(res.value){
        this.mostrarDonar = false;
        paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: this.product.description,
                    amount: {
                      currency_code: 'USD',
                      value: this.finalAmount,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              this.paidFor = true;
              console.log(order);

              this.auxiliaresServices.guardarDonacion(this.finalAmount);

              mensajeConfirmacion(
                'Gracias!',
                'Tu donación ayudará a mejorar la plataforma.'
              );
              this.mostrarDonar = true;
            },
            onError: (err) => {
              console.log(err);
            },
          })
          .render(this.paypalElement.nativeElement);

      }
    });
  }

  verDonaciones(){


    this.auxiliaresServices.getDonaciones().subscribe((data) => {
      const donacionFirebase: any = data.map((e) => {
        console.log('data: ', e.payload.doc.data());
        return e.payload.doc.data();
      });
      console.log('donacionFirebase: ', donacionFirebase);
      this.montoTotal = 0;
      for (const donacion of donacionFirebase) {
        // tslint:disable-next-line: radix
        this.montoTotal += parseInt(donacion.donacion) ;
      }



    });

  }
}
