import { graphql, RequestHandler } from 'msw';

const handlers: RequestHandler[] = [
  graphql.query('getTodos', (req, res, ctx) => res(ctx.data({
    data: {
      todos: [{ id: '0', text: 'todo', isCompleted: false }],
    },
  }))),
];

export default handlers;
