import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

const MaterialsComponents = [MatButtonModule, MatToolbarModule, MatInputModule, MatFormFieldModule];

@NgModule({

  imports: [MaterialsComponents],
  exports: [MaterialsComponents]
})
export class MaterialModule { }
