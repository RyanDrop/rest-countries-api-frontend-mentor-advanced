import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '@models/country.models';
import { BehaviorSubject, of } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RestCountriesApiService {
  readonly REST_COUNTRIES_API_URL = 'https://restcountries.com/v2';
  allCountries$$ = new BehaviorSubject<Country[]>([]);

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  getAllCountries() {
    const storageCountries = this.getCountriesFromLocalStorage();
    if (storageCountries.length)
      return this.allCountries$$.next(storageCountries);

    this.getCountriesFromApi().subscribe((countries) => {
      this.localStorage.set('countries', countries);
      this.allCountries$$.next(this.getCountriesFromLocalStorage());
    });
  }

  getCountriesFromApi() {
    return this.http.get(`${this.REST_COUNTRIES_API_URL}/all`);
  }

  getCountriesFromLocalStorage() {
    const storageCountries: Country[] = this.localStorage.get('countries');
    return storageCountries;
  }

  getCountryByName(name: string) {
    const storageCountries = this.getCountriesFromLocalStorage();
    const country = storageCountries.find((country: { name: string }) => {
      return country.name.toLowerCase().includes(name.toLowerCase());
    });

    if (!country) throw new Error('Country not found');

    return of(country);
  }

  getCountryBorders(bordersCodes: string[]) {
    if (!bordersCodes) return [];

    const storageCountries = this.getCountriesFromLocalStorage();
    const countries = storageCountries
      .filter((country) => {
        return bordersCodes.includes(country.alpha3Code);
      })
      .map((country) => {
        return country.name;
      });

    return countries;
  }
}
