import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapJoinByKey',
})
export class MapJoinByKeyPipe implements PipeTransform {
  transform(value: Array<any>, key: string): string {
    const mapValue = value.map((item) => item[key]);
    const joinedValue = mapValue.join(', ');
    return joinedValue;
  }
}
