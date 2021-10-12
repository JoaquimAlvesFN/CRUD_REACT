import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import './App.css';
import ProductsCreate from './pages/Products/product.create';
import ProductsUpdate from './pages/Products/product.update';
import ProductsList from './pages/Products/product.list';
import Login from './pages/Login';
import SalesCreate from './pages/Sales/sale.create';
import SalesList from './pages/Sales/sale.list';
import CustomerCreate from './pages/Customers/customer.create';
import CustomerUpdate from './pages/Customers/customer.update';
import CustomerList from './pages/Customers/customer.list';

const PrivateRoute: React.FC = ({children, ...rest}): any => {
  return (
    <Route
      {...rest}
      render={({location}) => localStorage.getItem('@CRUD:token') ? 
        ( children ) : 
        ( <Redirect to={{ pathname: "/", state: { from: location } }} /> )
      }
    />
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute>
          <Route path="/products" exact component={ProductsList} />
          <Route path="/products/create" exact component={ProductsCreate} />
          <Route path="/products/update" exact component={ProductsUpdate} />
          <Route path="/sales" exact component={SalesList} />
          <Route path="/sales/create" exact component={SalesCreate} />
          <Route path="/customers" exact component={CustomerList} />
          <Route path="/customers/create" exact component={CustomerCreate} />
          <Route path="/customers/update" exact component={CustomerUpdate} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
