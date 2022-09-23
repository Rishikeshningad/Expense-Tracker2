import { Switch, Route } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './components/store/ui-slice';
import {Fragment, useEffect } from 'react';

import Layout from './components/Layout/Layout';
import SignPage from './pages/SignPage';
import HomePage from './pages/HomePage';
import Login from './components/Auth/Login';
import Complete from './components/Layout/Complete';
import CompleteNow from './components/Layout/CompleteNow';
import Email from './components/Layout/Email';
import Cart from './components/Cart/Cart';
import Notification from './components/Card/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
   const showCart = useSelector(state => state.ui.cartIsVisible);
   const cart = useSelector(state => state.cart);
   const notification = useSelector(state => state.ui.notification);

   useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      }));
      const response = await fetch(
        'https://expense-3ec64-default-rtdb.firebaseio.com/cart.json', 
        {
        method: 'PUT',
        body: JSON.stringify(cart),
      });
    

    if (!response.ok) {
      throw new Error('Sending cart data failed.');
      
    }
      
    dispatch(uiActions.showNotification({
      status: 'success',
      title: 'Success!',
      message: 'Sent cart data successfully!',
    })
    );
  };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch(error =>{
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sent cart data failed!',
      })
      );
    });
   }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && 
      <Notification 
      status={notification.status} 
      title={notification.title} 
      message={notification.message}
      />}
    
    <Layout>
       {showCart && <Cart/>} 
      
      <Switch>
      
        <Route path='/' exact> <HomePage/>  </Route>
        <Route path='/signup'> <SignPage/> </Route>
        <Route path='/login'> <Login/> </Route>
        <Route path='/complete'> <Complete/> </Route>
        <Route path='/complete_now'> <CompleteNow/> </Route>
        <Route path='/email'> <Email/> </Route>
        
      </Switch>
    </Layout>
    </Fragment>
  );
}

export default App;