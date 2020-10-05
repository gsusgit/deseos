import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item-model';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html'
})
export class AgregarPage {

  lista: Lista;
  nombreItem = '';

  constructor(private deseosService: DeseosService, private router: ActivatedRoute) {
    const listaId = this.router.snapshot.paramMap.get('listaId').split(':')[1];
    this.lista = this.deseosService.obtenerLista(listaId);
  }

  agregarItem() {
    if(this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem = '';
    this.deseosService.guardarStorage();
  }

  cambioCheck(item: ListaItem) {
    const pendientes = this.lista.items.filter(itemData => !itemData.completado).length;
    if(pendientes == 0) {
      this.lista.terminada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.terminada = false;
      this.lista.terminadaEn = null;
    }
    this.deseosService.guardarStorage();
  }

  borrar(index: number) {
    this.lista.items.splice(index, 1);
    this.deseosService.guardarStorage();
  }

}
