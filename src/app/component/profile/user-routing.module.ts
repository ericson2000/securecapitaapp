import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/guard/authentication.guard';
import { UserComponent } from './user/user.component';


const userRoutes: Routes = [
    // sans le lazy loading
    // { path: 'profile', component: UserComponent, canActivate: [AuthenticationGuard] },
    // avec le lazy loading
    {
      path:'', children: [{ path: '', component: UserComponent, canActivate: [AuthenticationGuard]}]
    },
];

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
