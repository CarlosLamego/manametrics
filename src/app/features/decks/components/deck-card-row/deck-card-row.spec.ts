import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckCardRow } from './deck-card-row';

describe('DeckCardRow', () => {
  let component: DeckCardRow;
  let fixture: ComponentFixture<DeckCardRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckCardRow],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckCardRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
