import { COUNTRIES } from '@mocks/rest-countries-api.mock';
import { render, screen } from '@testing-library/angular';
import { CountryCardComponent } from './country-card.component';

const $countryCard = () => screen.getByTestId('country-card');

describe('CountryCardComponent', () => {
  const setup = async () =>
    await render(CountryCardComponent, {
      componentProperties: {
        country: COUNTRIES[0],
      },
    });
  it('should create the component', async () => {
    await setup();
    expect($countryCard()).toBeTruthy();
  });

  it('should display the country name', async () => {
    await setup();
    const countryName = screen.getByText(COUNTRIES[0].name);
    expect(countryName).toBeTruthy();
  });

  it('should display the country capital', async () => {
    await setup();
    const countryCapital = screen.getByText(COUNTRIES[0].capital);
    expect(countryCapital).toBeTruthy();
  });

  it('should display the country region', async () => {
    await setup();
    const countryRegion = screen.getByText(COUNTRIES[0].region);
    expect(countryRegion).toBeTruthy();
  });
});
