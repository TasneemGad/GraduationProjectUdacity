import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
<<<<<<< HEAD
=======

>>>>>>> 0040a6740fc2999bbe78ece01e6577da550225d8
const materials:any =[
  MatButtonModule,MatToolbarModule,MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule ,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatTabsModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatTableModule,
  MatMenuModule,  
  MatCheckboxModule,
  MatStepperModule,
  DragDropModule,
  MatDialogModule,
  MatRadioModule

];
@NgModule({
  declarations: [],
  imports: [materials],
  exports: [materials],
})
export class MaterialModule { }
