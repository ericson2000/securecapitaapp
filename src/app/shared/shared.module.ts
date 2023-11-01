import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { ExtractarrayvaluePipe } from '../pipes/extractarrayvalue.pipe';


@NgModule({
    declarations: [ExtractarrayvaluePipe],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        ExtractarrayvaluePipe,
        RouterModule,
        CommonModule,
        FormsModule
    ],
})
export class SharedModule { }
