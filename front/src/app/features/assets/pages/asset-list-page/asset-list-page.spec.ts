import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetListPage } from './asset-list-page';

describe('AssetListPage', () => {
  let component: AssetListPage;
  let fixture: ComponentFixture<AssetListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
