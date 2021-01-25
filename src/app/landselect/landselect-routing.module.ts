import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandselectPage } from './landselect.page';

const routes: Routes = [
  {
    path: '',
    component: LandselectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandselectPageRoutingModule {}
