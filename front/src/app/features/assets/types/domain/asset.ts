// typage de l'entite
export interface Asset {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  amount: number;
  status: string;
  category: string;
}
