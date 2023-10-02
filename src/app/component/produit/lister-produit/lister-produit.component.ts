import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/service/produit.service';

@Component({
  selector: 'app-lister-produit',
  templateUrl: './lister-produit.component.html',
  styleUrls: ['./lister-produit.component.css'],
})
export class ProduitComponent implements OnInit {
  public produits: Produit[] = [];
  public qte: number = 0;
  public itemsPerPage: number = 3;
  public p: number = 1;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.all();
  }

  all() {
    this.produitService.getAll().subscribe((response) => {
      if ('produitSucc' in response.data) {
        console.log(response.data.produitSucc);
        this.produits = response.data.produitSucc as Produit[];
        this.qte = this.produits
          .map((qte) => qte.quantite)
          .reduce((a, b) => a + b);
        console.log(this.qte);
      }
    });
  }

  choix(event: Event) {
    let target: any = event.target;
    this.itemsPerPage = target.value;
  }
}
