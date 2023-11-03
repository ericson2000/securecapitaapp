import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';
import { HomeComponent } from './component/home/home/home.component';

const routes: Routes = [
  // pour le lazy loading de profile
  {path: 'profile', loadChildren: () => import('./component/profile/user.module').then(module => module.UserModule)},
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: HomeComponent, canActivate: [AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //on peut egalement utiliser la config ci-dessous si l'app n'est pas trop lourde
  // imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
