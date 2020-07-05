import { Injectable, inject } from '@angular/core';

import { TodosData } from './todos.data';
import { Todos } from './todos.model';

/**
 * This Service is used for displaying the TODO List of this App.
 */
@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todos: Todos[];
  /**
   * inject hardcoded Todo List
   */
  constructor(todosData: TodosData) {
    this.todos = todosData.Todos;
  }
  /**
   * Calculate ratio of closed / total TODOs.
   */
  private calcStatus(): number {
    const totalTodosCount = this.todos.length;
    const closedTodosCount = this.todos.filter(
      (todo) => todo.status === 'erledigt'
    ).length;
    console.log('closed/total', closedTodosCount, totalTodosCount);
    return (closedTodosCount / totalTodosCount) * 100;
  }

  /**
   * Get calculated ratio of closed / total TODOs.
   */
  getStatus() {
    return this.calcStatus();
  }

  /**
   * Get Todo List
   */
  get Todos() {
    return this.todos;
  }
}
