import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { handleError } from '../../../_older/services/helpers/error.helper';
import { FullDateFrPipe } from '../../../shared/pipes/data-format.pipe';
type ISODateString = string;

interface Product {
  id: number;
  name: string;
  description: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  amount: number;
  categoryName: string;
}

@Component({
  selector: 'app-list-product',
  imports: [FullDateFrPipe],
  templateUrl: './list-product.html',
})
export class ListProduct implements OnInit {
  private http = inject(HttpClient);
  errorMessage: string | null = null;

  products: Product[] = [];
  loading = false;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.errorMessage = null;
    this.loading = true;

    this.http
      .get<Product[]>('http://localhost:8080/api/products', {
        withCredentials: true,
      })
      .subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
          console.log(data);
        },
        error: (err) => {
          this.errorMessage = 'Failed to get products';
          handleError(err, 'getProducts()');
          this.loading = false;
        },
      });
  }
}
