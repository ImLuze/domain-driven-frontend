import type { FunctionComponent } from 'react';
import type { Routes } from '../hooks/routes/models/routes';
import type { UILogic } from './logic';

/**
 * A Page Component has direct access to the routes provided by the routes interaction layer.
 * It would be possible to simply call the useRoutes interaction layer within the Page. As we do
 * with other interaction layer logic, but as pages are the main consumers of this logic.
 * It's easier and more performant to pass this data directly from the Routes component instead.
 */
type PageComponentBaseProps<P> = P & {
	routes: Routes;
};

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

/**
 * This makes it possible to pass a UILogic layer directly to a UIComponent as prop. Making it
 * easier to override the default UILogic layer without affecting the code of the presentation
 * layer. This is something that will rarely be used, but it's useful to have incase you need a
 * component to behave differently in one occasion over the other. Or incase you desire to extract a
 * component to a separate component library.
 */
type UIComponentBaseProps<P, O, M> = P & {
	logic?: UILogic<P, O, M>
};

/**
 * @summary
 * The View layer.
 *
 * @description
 * This layer is the actual UI part of the application. It determines how the UI looks and how the
 * user is able to interact with it.
 *
 * Concerns:
 * 1. Present data according to the design.
 * 2. Allow the user to create user events and pass them to the Presenter layer.
 * 3. Be accessible.
 *
 * Note: Declare your component as you would a normal React component, but with this interface
 * instead of the `FunctionComponent` interface. Don't pass the Operations and Models interface
 * unless necessary.
 *
 * @example
 * const Todo: UIComponent<Props> = (props) => {
 *   const { models, operations } = useTodo(props);
 *   const { title, description } = models;
 *   const { completeTodo, removeTodo } = operations;
 *
 *   return (
 *     <TodoStyle>
 *       <h3>{title}</h3>
 *       <p>{description}</p>
 *       <div className="actions">
 *         <button type="button" onClick={completeTodo}>V</button>
 *         <button type="button" onClick={removeTodo}>X</button>
 *       </div>
 *     </TodoStyle>
 *   )
 * }
 */
type UIComponent<P = {}, O = {}, M = {}> = FunctionComponent<UIComponentBaseProps<P, O, M>>;
