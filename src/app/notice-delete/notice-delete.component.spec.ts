import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeDeleteComponent } from './notice-delete.component';

describe('NoticeDeleteComponent', () => {
  let component: NoticeDeleteComponent;
  let fixture: ComponentFixture<NoticeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
