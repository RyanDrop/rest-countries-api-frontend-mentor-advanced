import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPage } from './pages/detail/detail.page';
import { HomePage } from './pages/home/home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: ':country',
    component: DetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
