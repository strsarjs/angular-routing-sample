import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { CricketHomeComponent } from './views/cricket-home/cricket-home.component';
import { IndiaComponent } from './views/cricket-home/india/india.component';
import { AustraliaComponent } from './views/cricket-home/australia/australia.component';
import { PlayerComponent } from './views/cricket-home/player/player.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Auth } from './Auth';
import { Resolver } from './resolve';
import { HeroFormComponent } from './hero-form/hero-form.component';

const appRoutes: Routes = [
  {
    path: 'cricket-home',
    component: CricketHomeComponent,
    children: [
      {
        path: 'india',
        component: IndiaComponent,
      },
      { path: 'india/:id', component: PlayerComponent },
      { path: 'australia', component: AustraliaComponent },
      { path: 'australia/:id', component: PlayerComponent },
    ],
  },
  {
    path: 'lazy',
    loadChildren: () => import('./lazy/lazy.module').then((m) => m.LazyModule),
    // loadChildren: './lazy/lazy.module#LazyModule',
    canActivate: [Auth],
    resolve: { resolvedData: Resolver },
  },
  { path: '', redirectTo: '/cricket-home', pathMatch: 'full' },
  { path: 'forms', component: HeroFormComponent },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot([...appRoutes], {
      // useHash: true,
      //preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
