import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Produit } from 'src/app/model/produit';
import { Vente } from 'src/app/model/vente';
import { VenteService } from 'src/app/service/vente.service';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css'],
})
export class VenteComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('btnPrix') btnPrix!: ElementRef;
  public form!: FormGroup;
  public myProduct: Produit[] = [];
  public myProducts: Produit[] = [];
  public formValue: any;
  public commande!: Vente;

  constructor(private venteService: VenteService) {
    this.form = new FormGroup({
      prix: new FormControl(0, [Validators.required, Validators.min(0)]),
      quantite: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  ngOnInit(): void {
    // this.ajout();
  }

  valueForm() {
    this.myProducts = this.myProduct;
    console.log(this.form.value);
    this.formValue = this.form.value;
    console.log(this.myProducts);
    this.modal.nativeElement.style.display = 'none';
    this.form.reset();
  }

  produit(event: Produit[]) {
    this.myProduct = event;
    console.log(this.myProduct);
    console.log(this.btnPrix.nativeElement.style.color);
  }

  displayNone() {
    this.modal.nativeElement.style.display = 'none';
  }

  valuePrix(event: Event) {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    if (this.myProduct[0].prixUnitaire >= +target.value) {
      this.btnPrix.nativeElement.style.backgroundColor = 'red';
    } else {
      this.btnPrix.nativeElement.style.backgroundColor =
        'rgb(49 196 141 / var(--tw-bg-opacity))';
    }
  }

  vente(event: Vente) {
    this.commande = event;
    this.venteService.add(this.commande).subscribe((response) => {
      console.log(response);
    });
  }
}
