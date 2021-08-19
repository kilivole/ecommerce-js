import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout, RegisterForm, LoginForm, Dashboard, PrivateRoute, ForgotPassword, UpdateProfile } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    
    // const [error, setError] = useState("");
    // const { currentUser} = useAuth();
    // const { logout } = useAuth();
    // const history = useHistory();


    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }
    const fetchCart = async ()=>{
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity)=>{
        const { cart } = await commerce.cart.add(productId, quantity);
        
        setCart(cart);
    }

    const handleUpdateCartQty = async (productId, quantity) =>{
        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart);
    }

    const handleRemoveFromCart = async (productId) =>{
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(()=>{
        fetchProducts();
        fetchCart();
    }, []);





    return (
        <AuthProvider>       
        <Router>
        <div>
            <Navbar totalItems={cart.total_items} />
            <Switch>
                <Route exact path="/signup">
                    <RegisterForm />
                </Route>
                <Route exact path="/login">
                    <LoginForm />
                </Route>
                <Route exact path="/forgot-password" >
                    <ForgotPassword />
                </Route>
                <PrivateRoute exact path="/update-profile" component={UpdateProfile}/>
                <PrivateRoute exact path="/profile" component={Dashboard} />
                <Route exact path="/">
                    <Products products={products} onAddToCart={handleAddToCart}/>
                </Route>
                <Route exact path="/cart">
                    <Cart cart={cart} 
                    handleUpdateCartQty = {handleUpdateCartQty}
                    handleRemoveFromCart = {handleRemoveFromCart}
                    handleEmptyCart  = {handleEmptyCart}        
                />                
                </Route>
                <Route exath path="/checkout">
                    <Checkout 
                        cart={cart}
                        order={order}
                        onCaptureCheckout={handleCaptureCheckout}
                        error={errorMessage}    
                        />
                </Route>
            </Switch>

        </div>            
        </Router>
        </AuthProvider>



    )
}

export default App;