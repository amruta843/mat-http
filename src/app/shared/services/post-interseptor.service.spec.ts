import { TestBed } from '@angular/core/testing';

import { PostInterseptorService } from './post-interseptor.service';

describe('PostInterseptorService', () => {
  let service: PostInterseptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostInterseptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
