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
  createAndInitializeFormGroup() {
    this.filtersGroup = new FormGroup({
      search: new FormControl(null),
      region: new FormControl(null),
    });

    this.filtersGroup.valueChanges
      .pipe(debounceTime(400))
      .subscribe((filters) => {
        this.filtersCountriesByRegionAndName(filters);
      });
  }

  filtersCountriesByRegionAndName(filters: { search: string; region: string }) {
    const { search, region } = filters;
    let countries = this.restCountriesApi.getCountriesByLocalStorage();

    if (region) {
      const filterByRegion = countries.filter(
        (country) => country.region === region
      );
      countries = filterByRegion;
    }
    if (search) {
      const filterBySearch = countries.filter((country) => {
        const countryNameLowerCase = country.name.toLowerCase();
        const searchLowerCase = search.toLowerCase();
        return countryNameLowerCase.includes(searchLowerCase);
      });
      countries = filterBySearch;
  }

    return this.countries$$.next(countries);
  }
}
