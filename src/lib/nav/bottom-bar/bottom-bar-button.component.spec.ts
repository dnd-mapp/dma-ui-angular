import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomBarButtonComponent } from './bottom-bar-button.component';

describe('BottomBarButtonComponent', () => {
  let component: BottomBarButtonComponent;
  let fixture: ComponentFixture<BottomBarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomBarButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomBarButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
