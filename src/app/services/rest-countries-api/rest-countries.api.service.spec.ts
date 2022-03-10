import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { COUNTRIES } from './../../mocks/rest-countries-api.mock';
import { RestCountriesApiService } from './rest-countries-api.service';

const restCountriesAllMock =
  'https://run.mocky.io/v3/306f42ab-6e89-4844-a3cb-8926b70833b4';

describe('rest countries api service', () => {
  let service: RestCountriesApiService;
  let httpController: HttpTestingController;
  const localStorage = new LocalStorageService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LocalStorageService,
          useValue: localStorage,
        },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RestCountriesApiService);
    httpController = TestBed.inject(HttpTestingController);
    localStorage.set('countries', COUNTRIES);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('service state should return all countries', () => {
    service.getAllCountries();
    expect(service.allCountries$$.getValue()).toEqual(COUNTRIES);
  });

  it('should return all countries by api', (done) => {
    const mockCountries = COUNTRIES;

    service.getAllCountriesByApi().subscribe((countries) => {
      expect(countries).toEqual(mockCountries);
    });

    const req = httpController.expectOne(
      `${service.REST_COUNTRIES_API_URL}/all`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
    done();
  });

  it('should return all countries by local storage', (done) => {
    expect(service.getCountriesByLocalStorage()).toEqual(COUNTRIES);
    done();
  });

  it('should return country by name', (done) => {
    expect(service.getCountryByName('Afghanistan')).toEqual(COUNTRIES[0]);
    done();
  });

  it('should return country by code', (done) => {
    expect(service.getCountryByCode('AFG')).toEqual(COUNTRIES[0].name);
    done();
  });
});
