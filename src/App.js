import { Switch, Route } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
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
import {sendCartData, fetchCartData} from './components/store/cart-action';


let isInitial = true;

function App() {
  const dispatch = useDispatch();
   const showCart = useSelector(state => state.ui.cartIsVisible);
   const cart = useSelector(state => state.cart);
   const notification = useSelector(state => state.ui.notification);
   const uiAuth = useSelector(state => state.auth.isAuthenticated)
   //const history = useHistory();

   console.log(uiAuth);
   
   useEffect(() => {
     dispatch(fetchCartData());
   }, [dispatch]);

   useEffect(() => {
    if (isInitial){
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
   
   }, [cart, dispatch]);

  // useEffect(() => {
  //  const token = localStorage.getItem('idToken');
  //   if(token) {
  //     dispatch(authActions.logout);
  //      history.push('/login');
  //   }
  // });

  return (
    <Fragment>
      {uiAuth && notification && 
      <Notification 
      status={notification.status} 
      title={notification.title} 
      message={notification.message}
      />}
    
    <Layout>
       {showCart && <Cart/>} 
      
      <Switch>
      { !uiAuth &&
       <>
        <Route path='*' exact> <Login/> </Route>
        <Route path='/signup'> <SignPage/> </Route>
       </>
      }
     
       {uiAuth && <Fragment>
        <Route path='/' exact> <HomePage/>  </Route>
       
       
        <Route path='/complete'> <Complete/> </Route>
        <Route path='/complete_now'> <CompleteNow/> </Route>
        <Route path='/email'> <Email/> </Route>
        </Fragment>}
      </Switch>
    </Layout>
    </Fragment>
  );
}

export default App;