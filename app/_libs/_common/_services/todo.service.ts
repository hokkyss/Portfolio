import { z } from 'zod';

import todoSchema from '../_models/tech-stack.model';

export default class TodoService {
  public static async getTodos() {
    return fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((res) => z.array(todoSchema).parse(res));
  }
}
