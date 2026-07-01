import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellsList } from './sells-list';

describe('SellsList', () => {
  let component: SellsList;
  let fixture: ComponentFixture<SellsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellsList],
    }).compileComponents();

    fixture = TestBed.createComponent(SellsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
