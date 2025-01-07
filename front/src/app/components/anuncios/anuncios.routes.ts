import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeusAnunciosComponent } from './meus-anuncios/meus-anuncios.component';
import { EditarAnuncioComponent } from './editar-anuncio/editar-anuncio.component';

export const AnunciosRoutes: Routes = [
  { path: 'meus-anuncios', component: MeusAnunciosComponent },
  { path: 'editar-anuncio/:id', component: EditarAnuncioComponent },
  { path: '', redirectTo: '/meus-anuncios', pathMatch: 'full' },
  { path: '**', redirectTo: '/meus-anuncios' }
];
