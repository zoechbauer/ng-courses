import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import { TodosData } from './todos.data';
import * as testData from '../tests/setup-test-data';

describe('TodosService', () => {
  let todosService: TodosService;
  let todosSpy: any;
  const testTodos = testData.setupTodos();

  beforeEach(() => {
    todosSpy = jasmine.createSpyObj('TodosData', [], { Todos: testTodos });

    TestBed.configureTestingModule({
      providers: [TodosService, { provide: TodosData, useValue: todosSpy }],
    });

    todosService = TestBed.inject(TodosService);
  });

  it('should get Todo Status', () => {
    expect(todosService.Todos).toBeTruthy('No todos returned');
    expect(todosService.Todos.length).toBe(3, 'wrong number of Todos');

    const closed = 1;
    const total = 3;
    expect(todosService.getStatus()).toBe(
      (closed / total) * 100,
      'wrong ratio'
    );
  });
});
