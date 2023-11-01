import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavbarModule } from '../navbar/navbar.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    NavbarModule
  ]
})
export class UserModule { }
