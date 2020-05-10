import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const MaterialsComponents = [MatButtonModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatRadioModule,
 MatSnackBarModule, MatProgressBarModule];

@NgModule({

  imports: [MaterialsComponents],
  exports: [MaterialsComponents]
})
export class MaterialModule { }
