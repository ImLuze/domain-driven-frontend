import { FunctionComponent } from 'react';
import { Routes } from '../hooks/routes/models/routes';

interface PageComponentBaseProps<P> extends P {
	routes: Routes;
}

/**
 * @summary
 * The glue layer between the Interaction layer and the View layer.
 *
 * @description
 * This layer connects the Interaction layer and the View layer together.
 *
 * Concerns:
 * 1. Provide data from the Interaction layer to the View layer.
 * 2. Receive user events from the View layer and delegate them back to the Interaction layer.
 *
 * Note: A Page Component holds no logic of its own.
 *
 * @example
 * const TodosPage: PageComponent = () => {
 *   const { models, operations } = useTodos(useGetTodos());
 *   const { todos, completedTodos } = models;
 *   const { completeTodo, removeTodo } = operations;
 *
 *   return (
 *     <TodosPageStyle>
 *       <h1>Todos</h1>
 *       <TodosList
 *         todos={todos}
 *         completedTodos={completedTodos}
 *         operations={{
 *           completeTodo,
 *           removeTodo
 *         }}
 *       />
 *     </TodosPageStyle>
 *   )
 * }
 */
type PageComponent<P = {}> = FunctionComponent<PageComponentBaseProps<P>>;
