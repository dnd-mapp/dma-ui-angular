import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideRailComponent } from './side-rail.component';

describe('SideRailComponent', () => {
  let component: SideRailComponent;
  let fixture: ComponentFixture<SideRailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideRailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideRailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
