import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';

const MaterialsComponents = [MatButtonModule, MatToolbarModule];

@NgModule({

  imports: [MatButtonModule],
  exports: [MatButtonModule]
})
export class MaterialModule { }
