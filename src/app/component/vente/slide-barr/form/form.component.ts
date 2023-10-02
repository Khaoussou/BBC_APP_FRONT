import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ami } from 'src/app/model/ami';
import { Caracteristique, Produit } from 'src/app/model/produit';
import { FormServiceService } from 'src/app/service/form-service.service';

@Component({
  selector: '.app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  public code: number = 0;
  public bool: boolean = false;
  public produit: Produit[] = [];
  public caracteristique: Caracteristique[] = [];
  @Output() produitEvent: EventEmitter<Produit[]> = new EventEmitter<
    Produit[]
  >();
  @Output() caracteristiqueEvent: EventEmitter<Caracteristique[]> =
    new EventEmitter<Caracteristique[]>();
  @Output() amiEvent: EventEmitter<Ami[]> = new EventEmitter<Ami[]>();
  @Output() products: EventEmitter<Produit[]> = new EventEmitter<Produit[]>();
  @Output() boolEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private formService: FormServiceService) {}
  product(event: Event) {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    this.code = +target.value;
    this.formService.search(this.code).subscribe((response) => {
      if (response.data.length == 0) {
        this.bool = true;
        this.amiEvent.emit([]);
        this.boolEvent.emit(this.bool);
      } else if (
        response.data.length == 1 &&
        response.message == 'Elément trouvé !'
      ) {
        this.bool = false;
        this.boolEvent.emit(this.bool);
        if ('caracteristique' in response.data[0]) {
          this.caracteristique = response.data[0]
            .caracteristique as Caracteristique[];
          if ('caracteristique' in this.caracteristique) {
            let newCaract: Caracteristique[] = this.caracteristique
              .caracteristique as Caracteristique[];
            this.caracteristiqueEvent.emit(newCaract);
          }
          this.produit = response.data as Produit[];
          this.produitEvent.emit(this.produit);
          console.log(this.produit);
        }
      } else {
        this.bool = false;
        this.boolEvent.emit(this.bool);
        let bap = response.data;
        this.produit = [];
        let yes = bap.map((produit) => {
          return {
            id: produit.succursale_id,
            succursale: produit.succursale ?? undefined,
            prixUnitaire: produit.prixUnitaire,
            prixPromo: produit.prixPromo,
            quantite: produit.quantite,
          };
        });
        this.amiEvent.emit(yes);
        this.products.emit(bap);
        let caracts = response.data[0].caracteristique;
        this.produit.push(bap[0]);
        this.produitEvent.emit(this.produit);
        this.caracteristiqueEvent.emit(caracts);
      }
    });
  }
}
