import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDemoAPIComponent } from './get-demo-api.component';

describe('GetDemoAPIComponent', () => {
  let component: GetDemoAPIComponent;
  let fixture: ComponentFixture<GetDemoAPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetDemoAPIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDemoAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
