# Presenter

![Presenter image](../assets/presenter.jpg)

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

## General workflow to write a Page Component:
1. Create an empty hook component in `<name>Page.tsx` file with the `PageComponent` type and add an empty component in a `<name>PageStyle.ts` file which extends on the `Layout` component from `style/Layout.ts`.
2. Add all the necessary GraphQL query files and run the `generate:graphql` script.
3. Create a `<name>Page.test.tsx` file, list all the features on your page and write failing integration tests for each.
	1. Create a describe block for all possible states your page might get in. (loading, error, successful etc...).
	2. Add all features for each state. (shows that the page is loading, shows all completed todos, allows the user to edit the title etc...).
	3. Some features might have some states of their own, add new describe blocks for those. (if the new title is valid, if the new title is invalid etc...)
	4. Continue nesting states and features until you have nothing more to add.
4. In your page, call all the necessary Interaction layer hooks and hook them up to the View layer components.
5. Position all the View layer components correctly in your `<name>PageStyle.ts` file.

*(Tip: Ever forget what a Page Component should do? Hover over the `PageComponent` type in your code.)*
