import React from "react";
import Header from "./Header";
import CartDrawer from "./CartDrawer";
import { Outlet } from "react-router-dom";
import axios from "axios";
import AppContext from '../context';

function Layout(){
    const [cartOpened, setCardOpened] = React.useState(false);   /// сохранение состояние открытой или закрытой корзины
  //  const [cartItems, setCartItems] = React.useState([]);   ////  сохранение состояния списка добавленных в корзину товаров 
    const {cartItems, setCartItems,} = React.useContext(AppContext);
    const onRemoveCartItem =  async (id) => {
        try {
          setCartItems(prev => prev.filter(item => item.id !== id)); /// очищаем то, что есть в корзине на сайте
          axios.delete(`http://localhost:3004/cart/${id}`)  //// добаление товаров в БД - передаем объект по ссылке в БД
        } catch (error) {
          alert("Не удалось удалить товар из корзины");
          console.error(error);
        }
      }
    return(
    <>
        <div>
            <CartDrawer 
            items={cartItems} 
            onClose={() => setCardOpened(false)} 
            onRemove={onRemoveCartItem}
            opened = {cartOpened}
            /> 
          </div>
        <Header onClickCart={ () => setCardOpened(true)} />
        <Outlet />
    </>
) 
};

export default Layout;