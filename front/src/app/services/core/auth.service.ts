import { Injectable, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { handleError } from '../helpers/error.helper';

// import { HttpClient } from "@angular/common/http";
// import { inject, Injectable } from "@angular/core";
// import { ApiService } from "./api.service";

export interface User {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'ubom_user';
  // store avec Signal
  private userSignal = signal<User | null>(this.loadUserFromStorage());

  // expose comme readonly
  user = this.userSignal.asReadonly();

  // calcul automatiquement quand userSignal change => like useMemo
  isAuthenticated = computed(() => this.userSignal() !== null);

  // useMemo like React
  setUser(user: User): void {
    this.userSignal.set(user);
    // save dans le localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    return this.userSignal();
  }

  clearUser(): void {
    this.userSignal.set(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // for load user from the local storage
  private loadUserFromStorage(): User | null {
    try {
      // recupère depuis le localStorage
      const storedUser = localStorage.getItem(this.STORAGE_KEY);

      if (storedUser) {
        return JSON.parse(storedUser);
      }
    } catch (err) {
      handleError(err, 'AuthService.loadUserFromStorage');
    }
    return null;
  }

  // export comme Observable si besoin
  user$ = toObservable(this.userSignal);
}

// interface LoginRequest {
//   email: string;
//   username: string;
//   password: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService{
//   private http = inject(HttpClient);
//   private api = inject(ApiService);

//   login(credentials: LoginRequest){
//     return 
//   }
// }