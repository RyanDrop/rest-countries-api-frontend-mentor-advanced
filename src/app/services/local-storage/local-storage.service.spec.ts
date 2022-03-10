import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  const service: LocalStorageService = new LocalStorageService();

  it('must define a new key and value in localStorage and soon after accessing it', () => {
    service.set('test', 'test1');
    expect(service.get('test')).toBe('test1');
  });
});
