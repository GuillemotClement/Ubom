import { TestBed } from '@angular/core/testing';

import { Sells } from './sells';

describe('Sells', () => {
  let service: Sells;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sells);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
