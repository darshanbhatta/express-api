# express-api

This is a boilerplate for a REST API server using Express.js and MongoDB in TypeScript.

## Table of Contents

-   [Setting Up](#setting-up)
    -   [.env File](#env-file)
    -   [Building and Running](#building-and-running)
-   [Development](#development)
    -   [Adding New Mongoose Models](#adding-new-mongoose-models)
    -   [Adding a New Route](#adding-a-new-route)
    -   [Testing](#testing)

## Setting Up

### .env File

Create a `.env` file based on the configuration in `example.env`.

### Building and Running

To start the app without Docker:

1. [Install MongoDB](https://www.mongodb.com/try/download/community) and have it running in the background.

2. Install dependencies:

`npm install`

3. Start the app:

`npm run dev-raw`

## Development

### Adding New Mongoose Models

To add a new collection:

1. Go to `src/lib/Database/models`.
2. Add a new model file.
3. Update the `index.ts` file to include your new model.

### Adding a New Route

To add a new Route:

1. Create a new file in the `src/routes` directory.

2. Use the following template:

```ts
import { z } from "zod";
import { rateLimiter } from "src/middlewares/rateLimiter.middleware";
import { RouteConfig } from "src/lib/routeLoader";
import { createHandler } from "src/lib/createHandler";

const { validator, handler } = createHandler(
    {
        params: z.object({
            id: z.string().min(3),
        }),
    },
    async (req, res) => {
        const { id } = req.params;

        return res.status(200).json({
            message: `Hello, ${id}!`,
        });
    }
);

export const route: RouteConfig = {
    method: "get",
    path: "/hello/world/:id",
    middlewares: [rateLimiter(), validator],
    handler,
};
```

3. **Explanation:**

    - **Schema Definition:** The `createHandler` function accepts a schema object where you define validation rules using `zod`. In the example, it validates that `id` is a string with a minimum length of 3.

    - **Handler Function:** The async function passed to `createHandler` is your route handler. It receives typed `req` and `res` objects based on the schema.

    - **Route Configuration:** Export a `route` object with the HTTP method, path, middlewares, and handler. The `routeLoader` will automatically load this route.

4. **Registering the Route:**

    - There's no need to manually add the route to your Express app. The `routeLoader` function scans the `src/routes` directory and registers all exported routes.

5. **Using Middlewares:**

    - You can add middlewares like `rateLimiter()` to the `middlewares` array in your route configuration.

### Testing

To add new tests:

1. Add new files to the `tests` directory or edit existing ones.
2. Ensure the file name follows this format: `<name>.tests.ts`.

Run the tests with:

`npm test`
