import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestCountriesApiService } from 'src/app/services/rest-countries-api/rest-countries-api.service';
import { Currency, Language } from 'src/models/country.models';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {
  currentCountry!: string;
  subs!: Subscription;

  constructor(
    private restCountriesApi: RestCountriesApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs = this.route.params.subscribe((params) => {
      this.currentCountry = params['country'];
    });
  }

  get country() {
    return this.restCountriesApi.getCountryByName(this.currentCountry);
  }

  displayCurrencies(currencies: Currency[]): string {
    return currencies.map((currency) => currency.name).join(', ');
  }

  displayLanguages(languages: Language[]) {
    return languages.map((language) => language.name).join(', ');
  }

  displayBorder(borders: string) {
    return this.restCountriesApi.getCountryByCode(borders);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
