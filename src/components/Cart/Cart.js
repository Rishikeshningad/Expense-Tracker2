import Card from "../Card/Card";
import CartItem from "./CartItem";
import classes from "./Cart.module.css"
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log('items',cartItems);
    return (
      <Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          
          {cartItems.map((item) => (
            <CartItem
            key={item.id}
            item={{
              id: item.id,
              price: +item.price,
              quantity: item.quantity,
              title: item.title,
              description: item.description,
              total: item.quantity * +item.price,
              }}
           />
          
          ))

          }
        
        </ul>
      </Card>
    );
  };
  
  export default Cart;