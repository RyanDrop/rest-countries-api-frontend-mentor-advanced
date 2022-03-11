import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Country } from '@models/country.models';
import { RestCountriesApiService } from '@services/rest-countries-api/rest-countries-api.service';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  filtersGroup: FormGroup;
  countries$$ = new BehaviorSubject<Country[]>([]);

  constructor(private restCountriesApi: RestCountriesApiService) {}

  ngOnInit(): void {
    this.restCountriesApi.getAllCountries();
    this.countries$$ = this.restCountriesApi.allCountries$$;
    this.createAndInitializeFormGroup();
  }

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
    let countries = this.restCountriesApi.getCountriesFromLocalStorage();

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
