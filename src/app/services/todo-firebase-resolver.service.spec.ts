import { TestBed } from '@angular/core/testing';

import { TodoFirebaseResolverService } from './todo-firebase-resolver.service';

describe('TodoFirebaseResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoFirebaseResolverService = TestBed.get(TodoFirebaseResolverService);
    expect(service).toBeTruthy();
  });
});
