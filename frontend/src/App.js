import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AccountScreen from './screens/AccountScreen';
import FinalizeOrderScreen from './screens/FinalizeOrderScreen';
import Header from './components/main components/Header';
import Footer from './components/main components/Footer';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import { history } from './external dependencies/_helpers'
import ScrollToTop from './components/ScrollToTop'



function App() {
  return (
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)} history={history}>  
      <Header/>  
      <ScrollToTop>
        <>      
          <Route exact path='/' component={ HomeScreen }/>
          <Route path= '/finalize-order' component={ FinalizeOrderScreen }/>    
          <Route path='/account' component={ AccountScreen }/> 
          <Route path='/product/:product_id' component={ ProductDetailsScreen }/> 
          <Route path='/cart' component={ CartScreen }/>
          <Route path='/login' component={ LoginScreen }/>
          <Route path='/register' component={ RegisterScreen }/>
        </>
      </ScrollToTop>

      <Footer/> 
    </BrowserRouter>
  );
}

export default App;
