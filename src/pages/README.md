# Presenter
The Presenter of the application consists of multiple Container Components, more fittingly named: Page Components.
This layer connects the Interaction layer and the View layer together. While Interaction layer domains or View layer components are usually reusable throughout the application, or even multiple applications. The individual Page Components are usually not.

*(Note: A Page Component holds no logic of its own.)*

---

## What does it do?
1. Provide data from the Interaction layer to the View layer.
2. Receive user events from the View layer and delegate them back to the Interaction layer.

## Files in a Page Component directory:
* `<name>Page.tsx`: Main component which links the Interaction layer and the View layer together.
* `<name>PageStyle.ts`: Positions all the View layer components on the page and adds page-specific styling.
* `<name>Page.test.tsx`: Lists all the features which are enabled by this page and runs integration tests for them.
* `*.graphql`: All queries necessary to enable every feature on this page.
* `/models`: All page-specific TypeScript declaration files.
* `/components`: All page-specific React Components which are not meant to be reused elsewhere.

GraphQL queries will only be used by their respective Page Components. This makes it useful to place the actual GraphQL files as close to their Page Component as possible. Doing this makes it easier to reason about why certain fields are requested and allows us to generate page-specific types as close as possible to the actual page.

We generally won't add any models to the page models directory ourself. These are merely types generated from their GraphQL queries.

*(Tip: Ever forget what a Page Component should do? Hover over the `PageComponent` type in your code.)*
