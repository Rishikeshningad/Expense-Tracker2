import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch(
                'https://expense-3ec64-default-rtdb.firebaseio.com/cart.json'
            );

            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }

            const data = await response.json();
              console.log(data,'cart');
            return data;
        };
        try { 
          const cartData = await fetchData();
          cartData.items.forEach(element => {
            dispatch(cartActions.addItemToCart(element))
          });
         
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            )
        }
    };
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
      );
     
      const sendRequest = async () => {
        const response = await fetch(
          'https://expense-3ec64-default-rtdb.firebaseio.com/cart.json', 
          {
          method: 'PUT',
          body: JSON.stringify(cart),
        });
      
        if (!response.ok) {
           throw new Error('Sending cart data failed.');
        }
      };
  
      try {
        await sendRequest();
        dispatch(uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
        );
      } catch (error) {
        dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sent cart data failed!',
        })
        );
      }
     };
  };