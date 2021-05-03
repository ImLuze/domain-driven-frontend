/**
 * The UI Logic layer determines which operations and modals the Presentation layer has access to.
 * It holds all the logic specific to this component.
 */
export interface UILogic<O, M> {
  operations: O;
  models: M;
}

/**
 * The Interaction layer is the decision making layer.
 * It maps API data to a set of application-specific interfaces.
 * This layer decides which domain specific models and operations the application has access to.
 */
export interface AppLogic<O, M> {
  operations: O;
  models: M;
}
