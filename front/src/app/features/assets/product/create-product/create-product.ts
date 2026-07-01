import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { handleError } from '../../../../_older/services/helpers/error.helper';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-create-product',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './create-product.html',
  standalone: true,
})
export class CreateProduct implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private readonly API_URL_GET_CATEGORY = 'http://localhost:8080/api/products/category';
  errorMessage: string | null = null;

  // viens stocker les donnees categories recu avec la requete
  categories: Category[] = [];
  loading = false;

  // appel a la construction du composant
  ngOnInit(): void {
    this.getActiveCategory();
  }

  // REQUETE FETCH GET CATEGORIES
  getActiveCategory() {
    this.errorMessage = null;
    this.loading = true;

    this.http
      .get<Category[]>(this.API_URL_GET_CATEGORY, {
        withCredentials: true,
      })
      .subscribe({
        next: (data) => {
          this.categories = data; // stockage des categorie
          this.loading = false;
          console.log(data);
        },
        error: (err) => {
          this.errorMessage = 'Failed to load categories';
          handleError(err, 'getActiveCategory');
          this.loading = false;
        },
      });
  }

  productForm = new FormGroup<ProductForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    amount: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    categoryId: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get name() {
    return this.productForm.controls.name;
  }

  get amount() {
    return this.productForm.controls.amount;
  }

  get description() {
    return this.productForm.controls.description;
  }

  get categoryId() {
    return this.productForm.controls.categoryId;
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const payload: ProductData = this.productForm.getRawValue();
    this.createProduct(payload);
  }

  async createProduct(payload: ProductData) {
    this.errorMessage = null;
    // this.createProduct.detectChange();

    this.http
      .post<Product>('http://localhost:8080/api/products', payload, {
        withCredentials: true,
      })
      .subscribe({
        next: (product) => {
          console.log('Product create: ', product);
        },
        error: (err: HttpErrorResponse) => {
          handleError(err, 'createProduct');
        },
      });
  }
}

interface ProductForm {
  name: FormControl<string>;
  amount: FormControl<number>;
  description: FormControl<string>;
  categoryId: FormControl<number>;
}

interface ProductData {
  name: string;
  amount: number;
  description: string;
  categoryId: number;
}

interface Product {
  name: string;
  amount: number;
  description: string;
  categoryId: number;
}
