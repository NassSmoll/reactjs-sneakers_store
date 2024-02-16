import React from 'react';
import axios from 'axios';

import Info from '../Info'
import { useCart } from '../../hooks/useCart';

import styles from '../CartDrawer/CartDrawer.module.scss';


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function CartDrawer({onClose, onRemove, items = [], opened}){

    const { cartItems, setCartItems, totalPrice } = useCart();
 
    const [ orderId, setOrderId ] = React.useState(null);
    const [ isOrderComplete, setIsOrderComplete ] = React.useState(false);
    const [ isLoading, setIsLoading ] = React.useState(false);
  

    const onClickOrder = async () => {
      try {
        setIsLoading(true);
        const {data} = await axios.post('http://localhost:3004/orders', {items: cartItems}); 
      
        setOrderId(data.id);
        setIsOrderComplete(true);
        setCartItems([]); //// Очистка корзины через контекст

       for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`http://localhost:3004/cart/${item.id}`);
        await delay(1000);
       }
      } catch (error) {
        alert("Ошибка при создании заказа :(");
      }
      setIsLoading(false);
    }

    return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
        <div className={styles.drawer}>
          <h2 className="d-flex justify-between mb-30">
             Корзина <img onClick={onClose} className="removeBtn cu-p" width={30} src="img/btn-remove.svg" alt="Close Cart" />
          </h2>
                
          <div className='CardInner'>
          { items.length > 0 ? (    
            <div className="d-flex justify-between flex-column mb-30">       
              <div className="items">     
              
                { items.map((obj) => (
                  
                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                      <div className="cardItemImg mr-20" style={{ backgroundImage: `url(${obj.imageUrl})` }}></div>
                      
                      <div className="mr-20">
                        <p className="mb-5">{obj.title}</p>
                        <b>{obj.price} руб.</b>
                      </div>
                      <img onClick={() => onRemove(obj.id)} className="removeBtn" width={30} src="img/btn-remove.svg" alt="Remove" />
                  </div>   
                  
                  ))}
                  
              </div>
            <div className="cartTotalBlock">
              <ul className="">
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{totalPrice*5/100} руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} className="orderBtn" onClick={onClickOrder}>Оформить заказ <img src="img/arrow.svg"  alt="Arrow" /></button>
            </div>
          </div>
             ) : (     
              <Info 
                title={ isOrderComplete ? "Заказ оформлен" : "В корзине ничего нет" }
                description={ isOrderComplete ? `Ваш заказ #${orderId}. Ждем вас за сдедующими покупками` : "Добавте хотя бы одну пару кроссовок, чтобы сделать заказ" }
                image={ isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg" }
              />
           )}
         </div>
        </div>
     </div>
            
    );
}


export default CartDrawer;