import { Service } from '@angular/core';
import { environment } from '../../../../core/config/environment.development';

@Service()
export class Sells {
  private BASE_SELL_URL = `${environment.apiUrl}/sells`;

  // async getActiveSellsUser(): Promise<>
}
