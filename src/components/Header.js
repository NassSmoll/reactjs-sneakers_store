import React from 'react';
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart';

function Header(props){
     const { totalPrice } = useCart();

    return (
        <header className="d-flex justify-between align-center p-40"> 
         <Link to='/'>
          <div className="d-flex align-center">
            <img height={40} src="img/logo.png" alt=""/>
            <div>
              <h3 className="text-uppercase">React Sneakers</h3>
              <p className="opacity-5">Магазин лучших кроссовок</p>
            </div>        
          </div>
        </Link>
        <ul className="d-flex">
     
          <li onClick={props.onClickCart} className="mr-30 cu-p">
            <img width={20} height={20} src="img/basket.svg" alt="Корзина"/><span>{totalPrice} руб.</span>
          </li>
          <li onClick={props.onClickFavorite} className="mr-30 cu-p">
          <Link to='/favorites'>
            <img width={20} height={20} src="img/heart-unliked.svg" alt="Избранное"/>
            </Link>
          </li>
          <li>
          <Link to='/orders'>
          <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 944 943.34">
            <path 
            d="M944,471.86c-.19,260.42-211.72,471.69-472.06,471.48C211,943.12-.45,731.53,0,471.21.45,210.63,212.49-.9,472.33,0,733.63.91,944.19,211.55,944,471.86ZM576.86,558c99,33.07,170.75,96.76,215.93,190.55C926.45,599.22,941.13,349.2,779.62,179.1,615,5.74,338.51,3,170.91,172.26c-166.4,168.06-156,423.25-19,576.37C197.19,654.78,268.77,590.76,368.09,558,270,492.53,256.81,358.65,331.5,275.11c69.76-78,190.44-84.95,268.3-13.53,37.8,34.67,58.73,78.1,60.93,129.31C663.78,461.72,633.84,516.85,576.86,558Z" 
            fill="#010101"/>
            </svg>  
            </Link>      
            </li>
        </ul>
       </header>
            
    );
}


export default Header;