import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPotsComponent } from './my-posts.component';

describe('MyPotsComponent', () => {
  let component: MyPotsComponent;
  let fixture: ComponentFixture<MyPotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyPotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
