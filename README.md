## Development

### Project Structure

- `src/client` contains the [React](https://reactjs.org/) app
- `src/server` contains the [Node](https://nodejs.org/) [Express.js](https://expressjs.com/) app
- `package.json` in the project root contains scripts to run in dev mode locally, and also to build and run on Heroku

### Local Dev Setup

All commands run from project root:

1. `cd src/client && npm install`
2. `cd src/server && npm install`
3. Make sure `nodemon` & `concurrently` are installed globally
4. `npm run dev`