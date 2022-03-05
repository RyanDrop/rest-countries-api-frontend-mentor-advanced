import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Country } from 'src/models/country.models';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RestCountriesApiService {
  private REST_COUNTRIES_API_URL = 'https://restcountries.com/v2/';
  allCountries$$ = new BehaviorSubject<Country[]>([]);

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  getAllCountries() {
    const storageCountries: Country[] = this.localStorage.get('countries');
    if (storageCountries.length)
      return this.allCountries$$.next(storageCountries);

    this.http
      .get(`${this.REST_COUNTRIES_API_URL}all`)
      .subscribe((countries) => {
        this.localStorage.set('countries', countries);
        this.allCountries$$.next(this.localStorage.get('countries'));
      });
  }

  getCountriesByLocalStorage() {
    const storageCountries: Country[] = this.localStorage.get('countries');
    return storageCountries;
  }

  getCountryByName(name: string) {
    const storageCountries = this.localStorage.get('countries');
    const country = storageCountries.find((country: { name: string }) => {
      return country.name.toLowerCase().includes(name.toLowerCase());
    });
    return country;
  }

  getCountryByCode(code: string) {
    const storageCountries = this.localStorage.get('countries');
    const country = storageCountries.find((country: { alpha3Code: string }) => {
      return country.alpha3Code.includes(code);
    });
    return country.name;
  }
}
