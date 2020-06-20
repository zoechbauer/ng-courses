import { Injectable } from '@angular/core';

import * as data from './todos.data';
import { Todos } from './todos.model';

/**
 * This Service is used for displaying the TODO List of this App.
 */
@Injectable({
  providedIn: 'root',
})
export class TodosService {
  /**
   * Calculate ratio of closed to toal TODOs.
   */
  private calcStatus(): number {
    const todos: Todos[] = data.todoList;
    const totalTodosCount = todos.length;
    const closedTodosCount = todos.filter((todo) => todo.status === 'erledigt')
      .length;
    console.log('closed/total', closedTodosCount, totalTodosCount);
    return (closedTodosCount / totalTodosCount) * 100;
  }

  /**
   * Get calculated ratio of closed to toal TODOs.
   */
  getStatus() {
    return this.calcStatus();
  }
}
