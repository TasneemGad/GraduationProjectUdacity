import { TestBed } from '@angular/core/testing';

import { MentorOrInstractorService } from './mentor-or-instractor.service';

describe('MentorOrInstractorService', () => {
  let service: MentorOrInstractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentorOrInstractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
