import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddlocPageRoutingModule } from './addloc-routing.module';

import { AddlocPage } from './addloc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddlocPageRoutingModule
  ],
  declarations: [AddlocPage]
})
export class AddlocPageModule {}
