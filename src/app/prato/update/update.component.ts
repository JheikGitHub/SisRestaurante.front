import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prato } from '../Prato';
import { PratoService } from '../prato.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  private form: FormGroup;
  private prato: Prato;
  private id: number;
  private message: string = '';

  constructor(private service: PratoService, private formBuild: FormBuilder, private parans: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = parseInt(this.parans.snapshot.paramMap.get('id'));

    this.service.getOne(this.id).subscribe(
      (data) => {
        this.form.setValue({
          nome: data.nome,
          preco: data.preco
        });
      }
    );
    this.initialProperties();

  }

  onSubmit() {

    if (this.form.invalid) {
      return this.validations();
    }

    this.prato = this.form.getRawValue();

    console.log(this.id, this.prato);

    this.service.update(this.id, this.prato).subscribe(
      () => { alert("Prato atualizado com sucesso"), this.router.navigateByUrl('/pratos') },
      (err: HttpErrorResponse) => { this.message = err.message }
    );


  }

  initialProperties() {
    this.form = this.formBuild.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required]
    });
  }

  validations() {
    if (this.form.controls['nome'].status == 'INVALID') {
      return this.message = 'campo nome do prato é obrigatório.';
    }

    if (this.form.controls['preco'].status == 'INVALID') {
      return this.message = 'campo preço é obrigatório.';
    }
  }
}
