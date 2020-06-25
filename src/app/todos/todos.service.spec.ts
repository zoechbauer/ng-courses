import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import { TodosData } from './todos.data';

describe('TodosService', () => {
  let todosService: TodosService;
  let todosSpy: any;

  beforeEach(() => {
    todosSpy = jasmine.createSpyObj('TodosData', [], {
      Todos: [
        {
          id: 1,
          todo: 'Test Todo 1',
          category: 'Todos',
          type: 'neu',
          status: 'erledigt',
        },
        {
          id: 2,
          todo: 'Test Todo 2',
          category: 'Todos',
          type: 'neu',
          status: 'aktiv',
        },
        {
          id: 3,
          todo: 'Test Todo 3',
          category: 'Todos',
          type: 'neu',
          status: 'offen',
        },
      ],
    });

    TestBed.configureTestingModule({
      providers: [TodosService, { provide: TodosData, useValue: todosSpy }],
    });

    todosService = TestBed.get(TodosService);
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
