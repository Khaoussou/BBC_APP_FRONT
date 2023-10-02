export interface Produit {
  id: number;
  libelle: string;
  description: string;
  code: string;
  image: any;
  succursale_id: number;
  quantite: number;
  prixUnitaire: number;
  prixPromo: number;
  succursale?: string;
  caracteristique: Caracteristique[];
}

export interface Caracteristique {
  caracteristique: string;
  valeur: string;
}
