import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';

const CartItem = (props) => {
  const { description, title, quantity, total, price, id } = props.item;
  const dispatch = useDispatch();

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(
      id,
      ));
  };
  
  const addItemHandler = () => {
    dispatch(cartActions.addItemToCart(
      description,
      id,
      price,
      quantity,
      title,
     ));
  };
  // const addQuanity = (id) => {
  //   item = items.find((item) => id == item.id)
  //   item.id += 1
  //   }
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <h3>{description}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
