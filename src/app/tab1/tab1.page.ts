import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public deseosService: DeseosService, private router: Router, private alertController: AlertController) {
    
  }

  async agregarLista() {
    //this.router.navigateByUrl('/tabs/tab1/agregar');
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ], 
      buttons: 
      [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            if (data.titulo.lenth !== 0) {
              const idNuevaLista = this.deseosService.agregarLista(data.titulo);
              this.router.navigateByUrl(`/tabs/tab1/agregar/:${idNuevaLista}`);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  verLista(listaId: number) {
    this.router.navigateByUrl(`/tabs/tab1/agregar/:${listaId}`);
  }

}
