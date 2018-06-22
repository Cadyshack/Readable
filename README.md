# Readable - Content and Comment App Using React and Redux
This is a content and comment web app built during the [react nanodegree course from Udacity](https://www.udacity.com/course/react-nanodegree--nd019). Leveraging Redux, users are able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users are also able to edit and delete posts and comments, as well as sort posts and comments.

The server was provided by Udacity for this project, while the frontend was built entirely from scratch using _Create React App_ to bootstrap the build configurations. The servers is built in Node, but is very simple.

To view the documentation on the server API endponts please refer to the [api-server readme](/api-server)

## Prerequisites
You'll need npm installed on your machine in order to install all the dependencies found in `package.json`

## Installing
Be aware that the server files are found inside the **api-server** folder, and all server dependecies must be installed seperately from the front-end dependencies.

* Install and start the API server (from the root directory)
  * `cd api-server`
  * `npm install`
  * `node server`

* in another terminal window install frontend dependencies and start the dev server
  * navigate to the project root directory inside terminal
  * `npm install`
  * `npm start`

## Folder Structure
For a detailed explenation of how I went about structuring the various files in this project, please refer to the following two articles:
* [Fractal - A react app structure for infinite scale](https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af)
* [Scaling your Redux App with ducks](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be)

In short, this app is broken down in the following manner:
* Root files:
  * **index.js**: is the root level app component that renders the app
  * **index.css**: houses most of the global styles used throughout the site, with component specific styles added next to said component and using same name as the component but ending with .css (i.e. MyComponent.js would have specific css stored in MyComponent.css)
  * **App.js**: registers the routes, and is the main root level component that renders all other app components.
  * **config.js**: sotres environment variables like api endpoints.
  * **store.js**: initializes the redux store.

* Various Folders found under src folder:
  * **components**: this is where the shared components like _ErrorPage_ or _EditPost_ are found. Basically, any component that is used inside multiple components and need to be available globally are housed here.
  * **modules**: this is where all the Redux state (actions, reducers... using [re-ducks file structure](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be) are found)
  * **pages**: here are the root level components, ones which are directly mounted on level 1 routes.
    * Inside this folder you will find sub-folders, where each sub-folder corresponds to a root level folder of the same name, and houses all child components of this parent Component. The logic comes from the [fractal structure](https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af) where any Root component with child components houses these child components in a folder with same name as parent component but using lowerCamelCase for the folder and regular CamelCase for the Components
    * ex: _MyComponent_ with a _MyChildComponent_ would then create a folder named **myComponent** where you would find _MyChildComponent.js_ and possibly _MyChildComponent.css_ and any other child components. If _MyChildComponent_ also had a _ContactForm_ component as it's child, then inside **myComponent** folder you would create another folder named **contactForm**, and place the _ContactForm.js_ component here.



## Create React App
This project template was built with [Create React App](https://github.com/facebookincubator/create-react-app), which provides a simple way to start React projects with no build configuration needed.

Projects built with Create-React-App include support for ES6 syntax, as well as several unofficial / not-yet-final forms of Javascript syntax such as Class Properties and JSX.  See the list of [language features and polyfills supported by Create-React-App](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#supported-language-features-and-polyfills) for more information.


## Contributing
This repository is created as a course project for the Udacity React Nanodegree program. Therefore, I most likely will not accept pull requests.



