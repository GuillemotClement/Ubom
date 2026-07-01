import { AssetResponse } from '../types/api/asset.response';
import { Asset } from '../types/domain/asset';
// mapper -> tranforme les donnée d'un format a un autre
// ici il permet de convertir les date dans le bon format string -> Date
export const AssetMapper = {
  toDomain(response: AssetResponse): Asset {
    return {
      id: response.id,
      name: response.name,
      description: response.description,
      createdAt: new Date(response.createdAt),
      updatedAt: response.updatedAt ? new Date(response.updatedAt) : null,
      deletedAt: response.deletedAt ? new Date(response.deletedAt) : null,
      amount: response.amount,
      status: response.status,
      category: response.category,
    };
  },

  toDomainList(responses: AssetResponse[]): Asset[] {
    return responses.map((r) => this.toDomain(r));
  },
};
