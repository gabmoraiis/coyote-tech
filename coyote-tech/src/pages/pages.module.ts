import { provideRouter } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { panelRoutes } from  './panel.routes'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [provideRouter(panelRoutes)]
})
export class PagesModule { }
