import { Todos } from '../todos/todos.model';

export function setupTodos(): Todos[] {
  return todoTestList;
}

const todoTestList: Todos[] = [
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
];
