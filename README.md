## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Implemented Architecture

These are the implemented architectures in the project:

### `State Management using React Hooks`

The code base of this project is kind of similar as the example found [here](https://itnext.io/essential-react-hooks-design-patterns-a04309cc0404) which teaches us about two of the most important function in React Hooks:
- `useState()` to store and update states of a component, and
- `useEffect()` to execute functions whenever the array in its second argument changes.

This project is using `useLink` function from [valuelink](https://www.npmjs.com/package/valuelink) instead of the normal `useState()` for simplicity. The value of current state of any variables can be retrieved using `.value` and be set using `.set()` function.

### `State Management using Redux`

This project is using [redux](https://redux.js.org) for state management among different components. And this whole redux thingy can be incorporated with React Hooks with the help of `useSelector()` and `useDispatch()`.

This [article](https://blog.jakoblind.no/react-redux-hooks) has a great explanation on how to use React Hooks instead of the usual redux `mapStateToProps`, `mapDispatchToProps`, and `connect()` methods to communicate with redux's store.

### `Side Effect Management using Redux-Saga`

This project is using [Redux-Saga](https://redux-saga.js.org) to handle side effect management. This middleware is most useful when there are API or other asynchronous calls being made with complex flows in which calls depend on the next. In addition, testing becomes simple without necessity to mock the asynchronous behavior.

The key feature in Redux-Saga is of course the "generator" function, denoted with an `*` which makes use of the `yield` keyword and `next()` function to pause and invoke a chunk of code subsequently.

### `Unit Test using Enzyme`

This project is using [enzyme](https://airbnb.io/enzyme) for unit testing and this [article](https://medium.com/@lavitr01051977/jest-test-example-8a434db44e33) provides a thorough explanation on how to perform unit test on React application with Redux. From testing the redux actions, reducers, and even the React-Saga's generator functions.

Another great article related to unit testing can be found [here](https://dev.to/theactualgivens/testing-react-hook-state-changes-2oga), where it teaches us on how to test and simulate the changing of "hooked" state in a component.