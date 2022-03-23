import "./App.css";
import React from "react";
import Auth from "./components/Auth";
import UserContextProvider from "./components/Assets/user-context";
import AuthContextProvider from "./components/Assets/auth-context";
import {ProductsContextProvider} from "./components/Assets/products-context";
import {CartContextProvider } from "./components/Assets/cart-context";
import { MyOrdersContextProvider } from './components/Assets/myorders-context';
import { ThemeContextProvider } from './components/Assets/themes-context';
function App() {
  return (
    <div className="App">
          <AuthContextProvider>
            <UserContextProvider>
              <ProductsContextProvider>
                <CartContextProvider>
                  <MyOrdersContextProvider>
                    <ThemeContextProvider>
                      <Auth/>
                    </ThemeContextProvider>
                  </MyOrdersContextProvider>
                </CartContextProvider>
              </ProductsContextProvider>
            </UserContextProvider>
          </AuthContextProvider>
          </div>
  );
}  
export default App; 
 
