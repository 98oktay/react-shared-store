#  React Shared Store
State sharing with multiple components. You can save the state to localStorage or sessionStorage if you want and share between browser tabs.


### Features
- Create an dataStore Instance from that can be shared between multiple components.
- Register components so that they automatically re-render when selected state properties change.
- You can keep it in the browser using localStorage (or sessionStorage).
- If desired, it performs state sync on the browser tabs.

### Installation
```sh 
yarn add react-shared-store
```

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

##### Basket component
Basket.js
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

##### Listing component
Listing.js
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
