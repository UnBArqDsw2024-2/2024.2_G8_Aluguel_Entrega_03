import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioItemComponent } from './anuncio-item.component';

describe('AnuncioItemComponent', () => {
  let component: AnuncioItemComponent;
  let fixture: ComponentFixture<AnuncioItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnuncioItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnuncioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
