import { Pipe, PipeTransform } from '@angular/core';
import { Currency, Language } from 'app/models/country.models';

@Pipe({
  name: 'mapCountryData'
})
export class MapCountryDataPipe implements PipeTransform {

  constructor() { }

  transform <T extends Language | Currency> (countryData:Array<T>):string{
    const mapCountryData = countryData.map((data) => data.name)
    const joinMapCountryData = mapCountryData.join(', ')
    return joinMapCountryData
  }

}
