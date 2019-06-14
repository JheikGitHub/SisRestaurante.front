import { Component, OnInit } from '@angular/core';
import { Prato } from '../Prato';
import { PratoService } from '../prato.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private list: Prato[] = [];
  private message: string = '';

  constructor(private service: PratoService, private router: Router) { }

  ngOnInit() {
    this.service.getAll().subscribe(
      (data) => { this.list = data }
    );
  }

  delete(prato: Prato) {
    var resul = confirm("Realmente deseja excluir esse prato?")

    if (resul)
      this.service.delete(prato.id).subscribe(
        () => { alert("Prato removido com sucesso"), location.reload(), this.router.navigateByUrl('/prato') },
        (err: HttpErrorResponse) => { this.message = "Ocorreu unm erro ao tenta excluir o porduto." }
      );

  }
}
