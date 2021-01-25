import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandselectPageRoutingModule } from './landselect-routing.module';

import { LandselectPage } from './landselect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandselectPageRoutingModule
  ],
  declarations: [LandselectPage]
})
export class LandselectPageModule {}
