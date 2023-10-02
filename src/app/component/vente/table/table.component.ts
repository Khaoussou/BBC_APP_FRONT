import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Produit } from 'src/app/model/produit';
import { Product, Vente } from 'src/app/model/vente';

@Component({
  selector: '.app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges {
  @Output() addEmit: EventEmitter<void> = new EventEmitter<void>();
  @Output() newCommande: EventEmitter<Vente> = new EventEmitter<Vente>();
  public produitCommande!: FormArray<any>;
  public montant: number = 0;
  public index = 0;
  public valeur!: string;
  public reduction: number = 0;
  public totals: number = 0;
  public montantTotal: number = 0;
  @Input() products: Produit[] = [];
  @Input() formValue: any;
  @ViewChild('modal') monElementRef!: ElementRef;
  @ViewChild('input') input!: ElementRef;
  @ViewChild('spanMont') spanMont!: ElementRef;
  @ViewChild('spanRendue') spanRendue!: ElementRef;

  public mont: number = 0;
  ngOnInit(): void {
    console.log(this.products);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.products.length != 0) {
      console.log(this.products);
      console.log(changes);
      console.log(this.formValue);
      this.addEmit.emit(this.addRow());
      this.index++;
      console.log(this.input.nativeElement.value);
    }
  }

  constructor(private formBuilder: FormBuilder) {
    console.log(this.input);
  }

  form = this.formBuilder.group({
    produits: this.formBuilder.array([]),
  });

  get produits() {
    return this.form.get('produits') as FormArray;
  }

  addRow() {
    this.produitCommande = this.form.get('produits') as FormArray;
    this.produitCommande.push(this.newRow());
    console.log(this.produitCommande);
    this.montant +=
      this.produitCommande.value[this.index].prix_vente *
      this.produitCommande.value[this.index].qte_commande;
    this.valeur = this.montant.toString();
    this.spanMont.nativeElement.innerHTML = this.montant;
    this.totals =
      this.produitCommande.value[this.index].prix_vente *
      this.produitCommande.value[this.index].qte_commande;
  }

  updateValueGroup(index: number, attribut: string, value: string | number) {
    const groupToUpdate = this.produitCommande.at(index);
    groupToUpdate.get(attribut)?.setValue(value);
  }

  newRow() {
    return this.formBuilder.group({
      produit_succrusale_id: this.formBuilder.control(
        this.products[0].succursale_id,
        Validators.required
      ),
      nom: this.formBuilder.control(
        this.products[0].libelle,
        Validators.required
      ),
      image: this.formBuilder.control(
        this.products[0].image,
        Validators.required
      ),
      qte_commande: this.formBuilder.control(
        this.formValue.quantite,
        Validators.required
      ),
      prix_vente: this.formBuilder.control(
        this.formValue.prix,
        Validators.required
      ),
    });
  }

  deleteArtConf(index: number) {
    this.index = this.index - 1;
    this.montant =
      this.montant -
      this.produitCommande.value[index].prix_vente *
        this.produitCommande.value[index].qte_commande;
    this.valeur = this.montant.toString();
    this.produitCommande = this.form.get('produits') as FormArray;
    this.produitCommande.removeAt(index);
  }

  none() {
    this.monElementRef.nativeElement.style.display = 'none';
  }

  block() {
    if (this.produitCommande) {
      this.monElementRef.nativeElement.style.display = 'block';
    } else {
      alert('Veuillez remplir le panier svp !');
    }
  }

  message() {
    let bap: Product[] = [];
    bap = this.produitCommande.value.map((value: Product) => {
      return {
        qte_commande: value.qte_commande,
        produit_succrusale_id: value.produit_succrusale_id,
        prix_vente: +(value.prix_vente * value.qte_commande),
      };
    });
    let object: Vente = {
      client: 1,
      user: 1,
      montant: +this.montant,
      reduction: +this.reduction,
      produits: bap,
    };
    this.newCommande.emit(object);
    console.log(this.produitCommande.value);
    console.log(bap);
    console.log(object);
    alert('Commande valider avec succes !');
    this.monElementRef.nativeElement.style.display = 'none';
    this.produitCommande.clear();
  }

  remise(event: Event) {
    console.log(this.valeur);
    let target: HTMLInputElement = event.target as HTMLInputElement;
    if (+target.value <= 100) {
      this.input.nativeElement.value =
        (+this.valeur - (+this.valeur * +target.value) / 100).toFixed(2) +
        ' ' +
        'Fcfa';
      this.spanMont.nativeElement.innerHTML = this.input.nativeElement.value;
      console.log(this.input.nativeElement.value);
      this.reduction = +target.value;
    } else if (
      +target.value == 0 ||
      +target.value > 100 ||
      target.value == ''
    ) {
      this.input.nativeElement.value = this.valeur;
    }
  }

  rendue(event: Event) {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    let montant = this.spanMont.nativeElement.innerHTML.split(' ')[0];
    let bap: number = +montant;
    if (+target.value >= bap) {
      this.spanRendue.nativeElement.innerHTML = +target.value - bap;
    } else {
      this.spanRendue.nativeElement.innerHTML = 0;
    }
  }

  valueQte(event: Event, index: number) {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    this.updateValueGroup(index, 'qte_commande', target.value);
    this.montantTotal = this.totals;
    this.totals =
      this.produitCommande.value[index].prix_vente *
      this.produitCommande.value[index].qte_commande;
    if (this.montantTotal > this.totals) {
      this.montant =
        this.montant - this.produitCommande.value[index].prix_vente;
    } else {
      this.montant += this.produitCommande.value[index].prix_vente;
    }
  }
}
