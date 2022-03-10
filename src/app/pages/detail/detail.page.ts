import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Currency, Language } from '@models/country.models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RestCountriesApiService } from '@services/rest-countries-api/rest-countries-api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
@UntilDestroy()
export class DetailPage implements OnInit {
  currentCountry: string;

  constructor(
    private restCountriesApi: RestCountriesApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(untilDestroyed(this)).subscribe((params) => {
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
}
