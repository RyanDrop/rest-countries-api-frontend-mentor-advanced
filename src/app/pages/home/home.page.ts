import { Component, OnInit } from '@angular/core';
import { RestCountriesApiService } from 'src/app/services/rest-countries-api/rest-countries-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  searchCountry: string = '';
  regions = ['All regions', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  constructor(private restCountriesApi: RestCountriesApiService) {}

  ngOnInit() {
    this.restCountriesApi.getAllCountries();
  }

  get countries() {
    if (this.searchCountry.length === 0) return this.restCountriesApi.countries;
    this.restCountriesApi.searchCountries(this.searchCountry);
    return this.restCountriesApi.researchedCountries;
  }

  filterByRegion(region: string) {
    this.restCountriesApi.filterCountriesByRegion(region);
  }
}
