import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-produit',
  template: '<img [src]="data.imageUrl" alt="Product Image" style="max-width: 100%; max-height: 100%;">'
})
export class ImageProduitComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
