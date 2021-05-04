# Page Component

These are the page components. A page component (also known as container component) serves as the **controller** of the application. It serves as a glue layer between the **interaction** layer and the **presentation** layer (The view).

These components are unique per application. While presentational components and interaction layer logic are easily reused throughout multiple projects. The glue layer between is usually not.

---

## What does it do?
1. It links multiple independent features together. (see: [page example](https://github.com/ImLuze/frontend-architecture-demo/blob/main/src/pages/AlbumsPage.tsx))
2. Places every presentational component on it's correct position on the page. (see [page style example](https://github.com/ImLuze/frontend-architecture-demo/blob/main/src/pages/AlbumsPageStyle.ts))

## Integration testing
As mentioned above, this components links multiple features together. Because of this, it is the ideal candidate to run integration tests from. (see [integration test example](https://github.com/ImLuze/frontend-architecture-demo/blob/main/src/pages/AlbumsPage.test.tsx))

## Files in this folder:
* `<name>Page.test.tsx`: Lists all the features which are enabled on this page and runs integration tests for them.
* `<name>PageStyle.ts`: Positions all the components/sections and adds page-specific styling.
* `<name>Page.tsx`: Main page component which links the interaction layer and the view layer together.
* `*.graphql`: All queries and mutations necessary to enable every feature on this page.
* `/models`: All page-specific TypeScript declaration files.
* `/components`: All page-specific React Components which are not meant to be reused elsewhere.