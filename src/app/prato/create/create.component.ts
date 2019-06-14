import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Prato } from '../Prato';
import { Router } from '@angular/router';
import { PratoService } from '../prato.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  private form: FormGroup;
  private prato: Prato;
  private message: string = '';

  constructor(private service: PratoService, private formBuild: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initialProperties();
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.validations();
    }
    this.prato = new Prato();

    this.prato = this.form.getRawValue();

    this.service.create(this.prato).subscribe(
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
