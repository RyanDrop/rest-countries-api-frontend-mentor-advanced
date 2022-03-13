import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RestCountriesApiService } from '@services/rest-countries-api/rest-countries-api.service';
import { Country } from 'app/models/country.models';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
@UntilDestroy()
export class DetailPage implements OnInit {
  country: Country;

  constructor(
    private restCountriesApi: RestCountriesApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        untilDestroyed(this),
        switchMap((params) => {
          const currentCountry = params['country'];
          return this.restCountriesApi.getCountryByName(currentCountry);
        }),
        switchMap((country: Country) => {
          if (!country.borders) return of(country);

          const bordersCode = country.borders;
          const bordersName =
            this.restCountriesApi.getCountryBorders(bordersCode);
          return of({
            ...country,
            borders: bordersName,
          });
        })
      )
      .subscribe((country: Country) => {
        this.country = country;
    });
  }

  trackByFn(index: number, border: any) {
    return border;
  }
}
