import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckDialog } from './deck-dialog';

describe('DeckDialog', () => {
  let component: DeckDialog;
  let fixture: ComponentFixture<DeckDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
