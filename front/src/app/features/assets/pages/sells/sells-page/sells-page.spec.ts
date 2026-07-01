import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellsPage } from './sells-page';

describe('SellsPage', () => {
  let component: SellsPage;
  let fixture: ComponentFixture<SellsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SellsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
