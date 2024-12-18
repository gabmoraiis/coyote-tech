import { pagesRoutes } from './pages.routes';
import { provideRouter } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [provideRouter(pagesRoutes)]
})
export class PagesModule { }
