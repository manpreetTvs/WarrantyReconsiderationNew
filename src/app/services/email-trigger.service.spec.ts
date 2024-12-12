import { TestBed } from '@angular/core/testing';

import { EmailTriggerService } from './email-trigger.service';

describe('EmailTriggerService', () => {
  let service: EmailTriggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailTriggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
