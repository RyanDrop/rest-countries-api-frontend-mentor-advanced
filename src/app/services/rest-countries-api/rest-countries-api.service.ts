import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from 'src/models/countries.models';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RestCountriesApiService {
  private API_URL = 'https://restcountries.com/v2/';
  private filters: Array<Country> = [];
  countries?: Array<Country>;
  researchedCountries?: Array<Country>;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  getAllCountries() {
    const storageCountries = this.localStorage.get('countries');
    if (storageCountries.length) return (this.countries = storageCountries);

    return this.http.get(`${this.API_URL}all`).subscribe((countries) => {
      this.localStorage.set('countries', countries);
      this.countries = this.localStorage.get('countries');
    });
  }

}
