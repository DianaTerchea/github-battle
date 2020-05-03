import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
const MaterialsComponents = [MatButtonModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatRadioModule];

@NgModule({

  imports: [MaterialsComponents],
  exports: [MaterialsComponents]
})
export class MaterialModule { }
