import { Component } from '@angular/core';
import { ProduitService } from 'src/app/service/produit.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ListerProduitComponent {
  constructor(private produitService: ProduitService) {}

}