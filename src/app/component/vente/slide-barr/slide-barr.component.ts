import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ami } from 'src/app/model/ami';
import { Caracteristique, Produit } from 'src/app/model/produit';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: '.app-slide-barr',
  templateUrl: './slide-barr.component.html',
  styleUrls: ['./slide-barr.component.css'],
})
export class SlideBarrComponent {
  public produits: Produit[] = [];
  public myProduct: Produit[] = [];
  public caracteristiques: Caracteristique[] = [];
  public amis: Ami[] = [];
  public imageUrl: string = environment.url;
  public bool: boolean = false;
  public valueBtn: boolean = true;
  public form!: FormGroup;
  public id!: string;
  @Input() modal!: HTMLElement;
  @Output() productsEvent: EventEmitter<Produit[]> = new EventEmitter<
    Produit[]
  >();

  constructor() {
    this.form = new FormGroup({
      prix: new FormControl(0, [Validators.required, Validators.min(0)]),
      quantite: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  @ViewChild('defaultCaract') monElementRef!: ElementRef;
  @ViewChild('defaultLib') monElementRef1!: ElementRef;
  @ViewChild('img') image!: ElementRef;
  @ViewChild('bap') bap!: ElementRef;
  @ViewChild('btn') btn!: ElementRef;

  produitEmit(event: Produit[]) {
    console.log(event);
    this.produits = event;
    this.productsEvent.emit(this.produits);
    this.imageUrl = this.produits[0].image;
  }

  caractEmit(event: Caracteristique[]) {
    if ('caracteristique' in event) {
      console.log(event.caracteristique);
      this.caracteristiques = event.caracteristique as Caracteristique[];
    } else {
      this.caracteristiques = event;
    }
  }

  amiEmit(event: Ami[]) {
    console.log(event);
    this.amis = event;
    this.btn.nativeElement.style.display = 'none';
  }

  productsEmit(event: Produit[]) {
    event.forEach((e) => {
      this.myProduct.push(e);
    });
  }

  boolEmit(event: boolean) {
    console.log(event);
    this.btn.nativeElement.style.display = 'block';
    this.bool = event;
    if (this.bool) {
      this.valueBtn = true;
      this.monElementRef.nativeElement.innerHTML = '';
      this.monElementRef1.nativeElement.innerHTML = '';
      this.image.nativeElement.src = '';
    } else {
      this.valueBtn = false;
    }
  }

  none(event: Event) {
    console.log(event);
  }

  onSubmit() {
    console.log(this.form.value);
  }

  blocModal(event: Event) {
    let target: HTMLButtonElement = event.target as HTMLButtonElement;
    this.id = target.getAttribute('id') as string;
    if (this.myProduct.length != 0) {
      this.myProduct = this.myProduct.filter(
        (product) => product.succursale == this.id
      );
      this.productsEvent.emit(this.myProduct);
    }
    this.productsEvent.emit(this.produits);
    this.modal.style.display = 'block';
  }
}
