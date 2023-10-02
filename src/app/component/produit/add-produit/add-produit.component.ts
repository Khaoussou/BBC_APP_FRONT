import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Caract } from 'src/app/model/caract';
import { Marque } from 'src/app/model/marque';
import { Caracteristique, Produit } from 'src/app/model/produit';
import { Unite } from 'src/app/model/unite';
import { CaraxtService } from 'src/app/service/caraxt.service';
import { MarqueService } from 'src/app/service/marque.service';
import { ProduitService } from 'src/app/service/produit.service';
import { UniteService } from 'src/app/service/unite.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css'],
})
export class AddProduitComponent implements OnInit {
  public caracteristiques!: FormArray<any>;
  public marques: Marque[] = [];
  public caracts: Caract[] = [];
  public unites: Unite[] = [];
  public index: number = 0;
  public valeurs: any;
  public file!: File;
  public tabValue: string[] = [];
  public defaultImage: string = environment.url;
  public bool: boolean = false;
  public produits: Produit[] = [];
  public products: Produit[] = [];
  public produit?: Produit;
  constructor(
    private formBuilder: FormBuilder,
    private marque: MarqueService,
    private caract: CaraxtService,
    private produitService: ProduitService,
    private unite: UniteService
  ) {}
  form = this.formBuilder.group({
    libelle: ['', Validators.required],
    categorie: ['', Validators.required],
    code: ['', Validators.required],
    marque_id: [0, [Validators.required, Validators.min(0)]],
    prix_unitaire: [0, [Validators.required, Validators.min(0)]],
    quantite: [0, [Validators.required, Validators.min(0)]],
    image: ['', Validators.required],
    succursale_id: [1, Validators.required],
    caracteristique: this.formBuilder.array([]),
  });

  ngOnInit(): void {
    this.all();
  }

  get caracteristique() {
    return this.form.get('caracteristique') as FormArray;
  }

  addRow() {
    this.caracteristiques = this.form.get('caracteristique') as FormArray;
    this.caracteristiques.push(this.newRow());
    console.log(this.caracteristiques.value[this.index].caracteristique_id);
    this.index++;
    console.log(this.index);
  }

  newRow() {
    return this.formBuilder.group({
      caracteristique_id: this.formBuilder.control(0, Validators.required),
      valeur: this.formBuilder.control('', Validators.required),
      unite: this.formBuilder.control('', Validators.required),
      bool: this.formBuilder.control(false),
    });
  }

  deleteCaract(index: number) {
    this.caracteristiques = this.form.get('caracteristique') as FormArray;
    this.caracteristiques.removeAt(index);
    this.index = index;
  }

  onSubmit() {
    this.form.value.image = this.defaultImage;
    this.produitService.add(this.form.value).subscribe((response) => {
      console.log(response.data);
    });
    console.log(this.form.value);
    this.defaultImage = environment.url;
    this.form.reset();
    this.caracteristiques.clear();
  }

  all() {
    this.marque.getAll().subscribe((response) => {
      if ('marques' in response.data) {
        this.marques = response.data.marques as Marque[];
      }
    });
    this.caract.getAll().subscribe((response) => {
      if ('caractéristiques' in response.data) {
        this.caracts = response.data.caractéristiques as Caract[];
      }
    });
    this.unite.getAll().subscribe((response) => {
      if ('unites' in response.data) {
        this.unites = response.data.unites as Unite[];
      }
    });
    this.produitService.getAll().subscribe((response) => {
      if ('produitSucc' in response.data) {
        console.log(response.data.produitSucc);
        this.produits = response.data.produitSucc as Produit[];
        console.log(this.produits);
        this.products = [...this.produits];
        console.log(this.products);
      }
    });
  }

  updateValueGroup(
    index: number,
    attribut: string,
    value: string | number | boolean
  ) {
    const groupToUpdate = this.caracteristiques.at(index);
    groupToUpdate.get(attribut)?.setValue(value);
  }

  choixCaract(event: Event, index: number) {
    let target: HTMLSelectElement = event.target as HTMLSelectElement;
    if (this.caracteristiques.value[index].caracteristique_id != 0) {
      this.updateValueGroup(index, 'bool', true);
    }
    this.caract.getValue(+target.value).subscribe((response) => {
      if ('valeurs' in response.data) {
        this.valeurs = response.data.valeurs;
      }
      if (this.valeurs != null && this.caracteristiques.value[index].bool) {
        this.tabValue = this.valeurs.split(',');
        console.log(this.tabValue[index]);
      } else {
        this.tabValue = [];
      }
      console.log(this.tabValue);
    });
  }

  search(event: Event) {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    this.produit = this.products.find(
      (produit) => produit.libelle.toLowerCase() == target.value.toLowerCase()
    );
    if (this.produit) {
      this.caracteristiques = this.form.get('caracteristique') as FormArray;
      this.form.patchValue({ libelle: this.produit.libelle });
      this.form.patchValue({ prix_unitaire: this.produit.prixUnitaire });
      this.form.patchValue({ quantite: this.produit.quantite });
      this.form.patchValue({ code: this.produit.code });
      this.defaultImage = this.produit.image;
      let tab = this.produit.caracteristique;
      if ('caracteristique' in tab) {
        let bap: Caracteristique[] = tab.caracteristique as Caracteristique[];
        this.caracteristiques.clear();
        bap.forEach((caract) => {
          this.caracteristiques.push(
            this.formBuilder.group({
              caracteristique_id: caract.caracteristique,
              valeur: caract.valeur,
            })
          );
        });
      }
    }
  }

  onChange(event: any) {
    this.file = event.target.files[0];

    let fileReader = new FileReader();

    fileReader.readAsDataURL(this.file);

    fileReader.addEventListener('load', () => {
      this.defaultImage = fileReader.result as string;
      console.log(this.defaultImage);
    });
  }
}
