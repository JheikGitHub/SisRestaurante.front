import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PratoRoutingModule } from './prato-routing.module';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateComponent, UpdateComponent, ListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PratoRoutingModule
  ]
})
export class PratoModule { }
