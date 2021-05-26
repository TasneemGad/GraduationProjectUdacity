import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {  MatFormFieldModule } from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

const materials:any =[
  MatButtonModule,MatToolbarModule,MatSidenavModule,
  MatIconModule,MatCardModule,MatFormFieldModule ,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatTabsModule,
  MatInputModule,
  MatButtonModule
];
@NgModule({
  declarations: [],
  imports: [materials],
  exports: [materials],
})
export class MaterialModule { }
