import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';
import { authActions } from '../store/authReducer';
//import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import classes from './MainNavigation.module.css';

const MainNavigation = (props) => {
  //const history = useHistory();
const clearToken = () => {
 // localStorage.getItem('idToken');
 localStorage.removeItem("idToken");
 dispatch(authActions.logout);
// history.push('/login');
 window.location.href='/login';
};

const dispatch = useDispatch();
          
const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
};

const isAuth = useSelector(state => state.auth.isAuthenticated)

 const cartQuantity = useSelector(state => state.cart.totalQuantity)
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
         {!isAuth && (<ul><li>
            <Link to='/signup'>Sign Up</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li></ul>)}
          {isAuth && (<li>
            <button onClick={clearToken}>
              <Link to="/login">Logout</Link>
              </button>
              </li>)}
              {isAuth && (<li>
                <button onClick={toggleCartHandler}>
                    <span>Cart</span>
                    <span className={classes.cart}>{cartQuantity}</span>
                </button>
              </li>)}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;