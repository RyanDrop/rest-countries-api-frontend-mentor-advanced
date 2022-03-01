import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPage } from './detail.page';

describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
