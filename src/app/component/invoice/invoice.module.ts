import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceDetailComponent } from './invoice-detail/invoice.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { NewinvoiceComponent } from './newinvoice/newinvoice.component';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [
    NewinvoiceComponent,
    InvoicesComponent,
    InvoiceDetailComponent
  ],
  imports: [
    SharedModule,
    InvoiceRoutingModule,
    NavbarModule
  ]
})
export class InvoiceModule { }
