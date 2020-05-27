import { Injectable } from '@angular/core';

import * as data from './todos.data';
import { Todos } from './todos.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  /* calc status of todos: closed/total  */
  private calcStatus(): number {
    const todos: Todos[] = data.todoList;
    const totalTodosCount = todos.length;
    const closedTodosCount = todos.filter((todo) => todo.status === 'erledigt')
      .length;
    console.log('closed/total', closedTodosCount, totalTodosCount);
    return (closedTodosCount / totalTodosCount) * 100;
  }

  getStatus() {
    return this.calcStatus();
  }
}
