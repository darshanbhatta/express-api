# express-api

This is boilerplate for a REST API server that uses Express.js and MongoDB in TypeScript.
<br></br>
# Setting up

## .env file
Create a `.env` file with the following configuration in `example.env`
<br></br>

## Building and Running
This is instructions on starting up the app without using docker.
<br></br>
[Install MongoDB](https://www.mongodb.com/try/download/community) and have it running in the background
```sh
# install dependencies
npm install

# start app
npm run dev-raw
```
<br></br>
# Development
## Adding new Mongoose Models
Follow this when you need to add a new collection for your data. Go to `src/lib/Database/models` and  add a new model file and update the `index.ts` file.
## Testing
To add new tests, add new files to the `tests` directory or edit existing ones. Make sure the file is in the following format: `<name>.tests.ts`
```sh
# Run the following command to run the tests
npm test
```