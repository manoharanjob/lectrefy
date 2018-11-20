import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignManagementComponent } from '../manage/campaignmanagement.component';

describe('CampaignmanagementComponent', () => {
  let component: CampaignManagementComponent;
  let fixture: ComponentFixture<CampaignManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
