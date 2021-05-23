import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
const material=[MatButtonModule,MatIconModule,
  MatSidenavModule,MatToolbarModule,MatFormFieldModule,MatSelectModule]

@NgModule({
  declarations: [],
  imports: [material],
  exports: [material],
})
export class MaterialModule { }
