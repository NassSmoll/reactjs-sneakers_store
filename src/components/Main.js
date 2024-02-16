import React from 'react'; 
 import { Routes, Route } from 'react-router-dom';
 
import axios from '../utils/api.client';
import Card from './Card';
import Header from './Header';
import CartDrawer from './CartDrawer';
 
//import Favorites from './components/Favorites';

export default function Main() {

 
  const [items, setItems] = React.useState([]); /// сохранение состояния списка товаров
  const [searchValue, setSearchValue] = React.useState('');  /// сохранение состояния запроса поиска
  const [cartItems, setCartItems] = React.useState([]);   ////  сохранение состояния списка добавленных в корзину товаров 
  const [cartOpened, setCardOpened] = React.useState(false);   /// сохранение состояние открытой или закрытой корзины
  const [favorites, setFavorites] = React.useState([]);  // сохранение списка избранных товаров 


  React.useEffect(() => {
   /* 
   fetch('https://658408c04d1ee97c6bced17d.mockapi.io/items')
    .then(res => {
      return res.json();
    })
    .then((json) => {
      setItems(json); 
    });
     */
  
    axios.get('/items')   /// запрос на получение товарных позиций, которые хранятся на сервере в БД
    .then(res => {
      setItems(res.data);
      console.log(res.data);
    });

    axios.get('/cart') /// запрос на получение товарных позиций в корзине, которые хранятся на сервере в БД
    .then(res => {
      setCartItems(res.data);
    });
      
  }, []);


const onAddToCart = (obj) => {
  axios.post('/cart', obj)  //// сохранение добаленных оваров в БД - передаем объект по ссылке в БД
  .then(res => console.log(res.data));

  setCartItems(prev => [...prev, obj]);   /// prevsate (prev => [...prev, obj]) вместо [...cartItems, obj] - создает новый массив, берет все предыдущие данные, добавляет obj в конец, возвращает новый массив и заменяет его в cartItems
                                          /// т.е prev функция не сохранится в cartItems, она вызовется, передаст туда то, что есть в ней сейчас и вернет  новый массив
}

const onRemoveCartItem = (id) => {
  console.log(id);
   axios.delete(`/cart/${id}`)  //// добаление товаров в БД - передаем объект по ссылке в БД
   
  setCartItems(prev => prev.filter(item => item._id !== id)); /// очищаем то, что есть в корзине на сайте
}


const onAddToFavorite = (obj) => {
  axios.post('/favorites', obj)  //// сохранение добаленных оваров в БД - передаем объект по ссылке в БД
  .then(res => console.log(res.data));
  
  setFavorites(prev => [...prev, obj]);   /// ОТОБРАЖАЕМ ТО ЧТО ЕСТЬ В Favorites
}                                        /// prevsate (prev => [...prev, obj]) вместо [...cartItems, obj] - создает новый массив, берет все предыдущие данные, добавляет obj в конец, возвращает новый массив и заменяет его в cartItems
                                          /// т.е prev функция не сохранится в cartItems, она вызовется, передаст туда то, что есть в ней сейчас и вернет  новый массив

console.log(favorites);

const onChangeSearchInput = (event) => {
  console.log(event.target.value);
  let inputText = event.target.value;
   setSearchValue(inputText);
}

// console.log(cartItems);

const SneakersList = () => {
    
    return (
        <div className="content p-40">
        <div className="mb-40 d-flex justify-between align-center">
          <h1> {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"/>
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>  
           {searchValue && (
              <img className="clear cu-p" 
                onClick={() => setSearchValue('')} 
                width={30} 
                src="/img/btn-remove.svg" 
                alt="Clear" 
              />
           )}
          </div>
        </div>
  
       <div className="d-flex flex-wrap">
   
        { items
          .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))  // Фильтрация по поиску items перед рендерингом
          .map((item) => (  /// рендеринг товаров
            <Card 
            key =  {item._id} 
            title = {item.title} 
            price = {item.price} 
            imageUrl = {item.imageUrl} 
            onPlus = { (obj) => onAddToCart(obj) }
            onFavorite = { (obj) => onAddToFavorite(obj)}
            />
        )) }
       </div>
  
       </div>
    );
  }


const Invoice = () => {
    return <div>Тестовая инфа для тестирования </div>;
  }
  

  return (

    <div className="wrapper clear">
    {cartOpened && <CartDrawer  items={cartItems} onClose={() => setCardOpened(false)} onRemove={onRemoveCartItem}/> }

     <Header onClickCart={ () => setCardOpened(true)} />
     <Routes>
         <Route path="/favorites" element= {<Invoice/>} />
         <Route path="/" element= {<SneakersList/>} />
     </Routes>

   
    </div>


  );

 
}

 

