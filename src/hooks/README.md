# Interaction layer
This is the decision making layer. This is the most complex concept within this architecture. Every hook in this directory is meant to be reusable and handles only domain or concern. (validation, todos, albums). You should see every hook as an expert in it's field.
Every hook enforces a set of **Application-specific** rules and tells us what our application can or cannot do.

*(Example: When we want to execute `createTodo` we might want to do some frontend validation before we execute the API request. We want to make sure that every instance of `createTodo` enforces the same rules.)*

Some Interaction layer logic might enforce rules which are specific to this application. (useTodos, useAlbums).
While others might be reusable throughout multiple projects. (useValidation, useAuth).

---

## What does it do?
1. Enforces application-specific rules.
2. Maps API data to our frontend models.
3. Returns a set of operations and models specific to it's domain which we can use throughout our application.

## Files in this folder:
* `use<name>.ts`: The hook that decides which operations and models get returned to the pages.
* `use<name>Operations.ts`: The hook that enforces rules before an API call. (TODO: Might be a good idea to combine this with the regular hook?).
* `*.graphql`: All queries and mutations necessary to enable every feature from this domain.
* `/models`: All domain-specific TypeScript declaration files.
