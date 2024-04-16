import {NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


let modulesArr=[MatSidenavModule,MatButtonModule,MatToolbarModule,
  MatListModule,MatIconModule,MatCardModule,MatDialogModule,MatProgressSpinnerModule]

@NgModule({
  declarations: [],
  imports:[
    CommonModule,
    ...modulesArr
  ],
  exports:[
    ...modulesArr]
})
export class MaterialModule { }
