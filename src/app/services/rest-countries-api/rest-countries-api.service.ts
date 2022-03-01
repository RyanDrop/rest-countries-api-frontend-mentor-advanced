import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from 'src/models/country.models';
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

  searchCountries(search: string) {
    const getCountries =
      this.filters.length === 0
        ? this.localStorage.get('countries')
        : this.filters;

    const filterCountries = getCountries.filter((country: { name: string }) => {
      return country.name.toLowerCase().includes(search.toLowerCase());
    });

    return (this.researchedCountries = filterCountries);
  }

  filterCountriesByRegion(region: string) {
    const getCountries = this.localStorage.get('countries');
    if (region === 'All regions') {
      this.filters = getCountries;
      return (this.countries = getCountries);
    }

    const filterCountries = getCountries.filter(
      (country: { region: string }) => {
        return country.region.toLowerCase().includes(region.toLowerCase());
      }
    );
    this.filters = filterCountries;
    return (this.countries = filterCountries);
  }
}
