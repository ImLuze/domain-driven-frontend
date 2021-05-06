# View layer (React Component)

![View image](../assets/view.jpg)


The View layer is the actual UI part of the frontend application. This layer presents data to to the user and allows the user to trigger certain user events.
The `components` directory consists only of fully reusable React Components.

The View layer is broken up in 2 separate sub-layers:
1. **The Presentation layer**: The visual styling and layout of the component.
2. **The UI logic**: The logic behind this specific component. This is what is being tested in unit tests.

---

## What does it do?
1. Present data to the user.
2. Allow user events to be triggered.

## Files in a View layer (React Component) directory:
* `<name>.tsx`: The layout of the component.
* `<name>Style.ts`: The styling of the component.
* `use<name>.ts`: The UI logic of the component.
* `<name>.test.ts`: Lists all the features of the UI logic and runs unit tests for them.

## General workflow to write a Presentation component:
1. Check if you need / have a failing integration test.
2. Create an empty component in a `<name>.tsx` and a `<name>Style.ts` file and an empty hook in `use<name>.ts` with the `UILogic` return type.
3. Add a `<name>.test.ts` file if:
	1. Your component solves a complex issue that needs to be documented or you notice from PR reviews that someone doesn't understand what you are trying to do.
	2. The issue you are solving is not being covered by an integration test.
	3. You need help debugging something that is cumbersome to test in a real life situation.
4. In your `use<name>.ts` file, add types for the `props`, `models` and `operations` which your component will use and write your UI logic.
5. Call your `use<name>` hook in your main component and hook everything up.

*(Tip: Ever forget what the UI logic should do? Hover over the `UILogic` type in your code.)*
