import { TestBed } from '@angular/core/testing';

import { TodoResolverService } from './todo-resolver.service';

describe('TodoResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoResolverService = TestBed.get(TodoResolverService);
    expect(service).toBeTruthy();
  });
});
