import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Novedad } from '@shared/model/Novedad';
import { PublicService } from '@shared/services/public.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss']
})

export class NovedadesComponent implements OnInit  {

  novedades: Novedad[];
  data: {sourceType?: string, url?: string} = {};

  urlNovedad: string;
  url: string;

  displayed: boolean = false;
  constructor(
    public fb: FormBuilder,
    private publicService: PublicService,
    private renderer2: Renderer2,
    private el: ElementRef
  ) { }

  /*########### Form ###########*/
  EnfermedadForm = this.fb.group({
    enfermedadSeleccionada: [null],
  });

  ngOnInit(): void {

    this.publicService.getNovedades()
    .subscribe(
      (novedades: Novedad[]) => { // Success
        console.log(novedades);
        this.novedades = novedades;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngAfterViewInit() {

    let scriptEl = document.createElement('script');
    scriptEl.src = 'https://platform.twitter.com/widgets.js'

    this.renderer2.appendChild(this.el.nativeElement, scriptEl);

  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}

  OnEnfermedadSubmit(){
    this.urlNovedad = this.enfermedadSeleccionadaFiled.value;
    this.data.sourceType = 'url';
    this.data.url = this.urlNovedad;
    this.displayed = false;

    this.delay(100).then(any=>{
      console.log('holaaa');
      this.displayed = true;

      let scriptEl = document.createElement('script');
      scriptEl.src = 'https://platform.twitter.com/widgets.js'

      this.renderer2.appendChild(this.el.nativeElement, scriptEl);
    });
  }

  get enfermedadSeleccionadaFiled(){
    return this.EnfermedadForm.get('enfermedadSeleccionada'); // controls['examenSeleccionado'];
  }




}
