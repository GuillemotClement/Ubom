import { inject, Injectable } from '@angular/core';
import { environment } from '../../../core/config/environment.development';
import { AssetResponse } from '../types/api/asset.response';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AssetMapper } from '../mappers/asset.mapper';
import { Asset } from '../types/domain/asset';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private http = inject(HttpClient);

  private BASE_URL = `${environment.apiUrl}/sells`;

  // la fonction retourne une liste dAsset plus tard => async en angular
  getAssetsUser(): Observable<Asset[]> {
    // fais la requête http vers le backend
    return (
      this.http
        .get<AssetResponse[]>(this.BASE_URL, {
          withCredentials: true,
        })
        // chaine de transformation => on utilise le mapper pour transformer les data du backend en data du type du domaine => typage de l'entite
        .pipe(map((responses) => responses.map(AssetMapper.toDomain)))
    );
  }
}
