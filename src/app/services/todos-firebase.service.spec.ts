import { TestBed } from '@angular/core/testing';

import { TodosFirebaseService } from './todos-firebase.service';

describe('TodosFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodosFirebaseService = TestBed.get(TodosFirebaseService);
    expect(service).toBeTruthy();
  });
});
