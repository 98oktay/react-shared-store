#  React Shared Store
State sharing with multiple components. You can save the state to localStorage or sessionStorage if you want and share between browser tabs.

[![npm](https://img.shields.io/npm/v/react-shared-store.svg)](https://npmjs.org/package/react-shared-store)
[![downloads](https://img.shields.io/npm/dm/react-shared-store.svg)](https://npmjs.org/package/react-shared-store)
[![keywords](https://img.shields.io/github/package-json/keywords/98oktay/react-shared-store.svg)](https://npmjs.org/package/react-shared-store)
[![author](https://img.shields.io/github/package-json/author/98oktay/react-shared-store.svg)](https://npmjs.org/package/react-shared-store)

### Features
- Create an dataStore Instance from that can be shared between multiple components.
- Register components so that they automatically re-render when selected state properties change.
- You can keep it in the browser using localStorage (or sessionStorage).
- If desired, it performs state sync on the browser tabs.

### Installation
```sh 
yarn add react-shared-store
```
----

### Code Demo
The following is an product/basket example of how to modify a property in a shared store object.

##### Create an Shared Store Instance
BasketStore.js
```js
import SharedStore from "react-shared-store";

const BasketStore = new SharedStore(
    {
        basketItems: []
    }
);

export default BasketStore;
```
_Create a new instance with initial state values. And export it._

#### Basket component
Basket.jsx
```js
import BasketStore from "./BasketStore.js";

export default class Basket extends React.Component {

    componentDidMount() {
        BasketStore.register(this, "basketItems") // or multiple keys ["basketItems","totalPrice"]
    }

    componentWillUnmount() {
         BasketStore.unregister(this)
    }

    render() {
        const {basketItems} = BasketStore.state;
        return <ul>
           basketItems.map((item, key) =>
               <li key={key}>
                {item.name} - {item.price}
               </li>
           )
        </ul>
    }
}
```
_Need to register to monitor the changes of a property._

#### Listing component
Listing.jsx
```js
import BasketStore from "./BasketStore.js";
import products from "./products.json";

export default class Listing extends React.Component {

    onAddProduct = (item) => {
        BasketStore.setState((prevState)=>{
            return {
                basketItems: [...prevState.basketItems, item]
            }
        });
    }

    render() {
        return <ul>
           products.map((item, key) =>
               <li key={key}>
                {item.name} - {item.price}
                <button onClick={()=>this.onAddProduct(item)}>Add To Basket</button>
               </li>
           )
        </ul>
    }
}
```
_Store Updateing is easy. It is the same as using react's setState()_


#### App component
app.jsx
```js
import React from 'react';
import Basket from "./Basket.jsx";
import Listing from "./Listing.jsx";

function App() {
    return (
        <div className="App">
            <Basket />
            <Listing />
        </div>
    );
}
export default App;

```

----

### Registering Components
React components will only re-render if they are registered with the shared state. To do this use the register() method. Registration should occur either in the constructor or componentDidMount.

`ExampleStore.register(this: React.Component, keys: string | Array<string>);`
this - Use 'this' to pass the react component itself into the shared state.
keys - The shared state's property/properties that you wish the react component to re-render when updated.

### Unregistering Components
All registered components need to unregister() before they are unmounted to remove listeners and prevent memory leaks. This is best done in componentWillUnmount.

`ExampleStore.unregister(this: React.Component);`
this - Use 'this' to pass the react component itself into the shared state.

### Getting state properties
The state property get the current state. Warning: do not mutate the state directly as this will not cause components to re-render

`const { exampleProp } = ExampleStore.state;`
Using object destructuring allows quick and clean access to state properties.

### Setting state properties
Like react components, shared states are updated using the setState() method, which accepts a partial state, updating corresponding state values.

`ExampleStore.setState(partialState: object);`
partialState - An object of key/value pairs. Functions can be used as values to manipulate current property values (see setting with functions below).

### Reset Properties
State can be easily returned to its default state using the reset() method.

`ExampleStore.reset();`

### Advanced Features
- Save state to storage (session or local)
`ExampleStore.useStorage(name: <string>, options: object);`
default options `{ type: "local", delay: 200 };`

- Share state between browser tabs option `shareOnTabs: true`
*Note*: You can use this feature If type is defined as 'local' only.

----

## Contributing
If you want to contribute to a project and make it better, your help is very welcome. Contributing is also a great way to learn more about social coding on Github, new technologies and and their ecosystems and how to make constructive, helpful bug reports, feature requests and the noblest of all contributions: a good, clean pull request.
