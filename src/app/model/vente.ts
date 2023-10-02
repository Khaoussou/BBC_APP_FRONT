export interface Vente {
  client: number;
  user: number;
  montant: number;
  reduction?: number;
  produits: Product[];
}

export interface Product {
  qte_commande: number;
  produit_succrusale_id: number;
  prix_vente: number;
}
