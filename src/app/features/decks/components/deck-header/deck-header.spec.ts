import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckHeader } from './deck-header';

describe('DeckHeader', () => {
  let component: DeckHeader;
  let fixture: ComponentFixture<DeckHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
