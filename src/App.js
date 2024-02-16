import React from 'react'; 
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import AppContext from './context'; 



function App() {

    const [items, setItems] = React.useState([]); /// сохранение состояния списка товаров
    const [cartOpened, setCardOpened] = React.useState(false);   /// сохранение состояние открытой или закрытой корзины
    const [cartItems, setCartItems] = React.useState([]);   ////  сохранение состояния списка добавленных в корзину товаров 
    const [favoritesItems, setFavorites] = React.useState([]);  // сохранение списка избранных товаров 
    const [searchValue, setSearchValue] = React.useState('');  /// сохранение состояния запроса поиска
    const [ isLoading, setIsLoading] = React.useState(true);  ///  состояние загрузки товаров
   
   
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
     
    async function fetchData(){
       try {
        
        const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([ 
          /// запрос на получение товарных позиций,позиций в корзине, позиций в Избранном, которые хранятся на сервере в БД
          axios.get('http://localhost:3004/items'), 
          axios.get('http://localhost:3004/cart'), 
          axios.get('http://localhost:3004/favorites')
        ]);  
      
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
        setIsLoading(false);
       } catch (error) {
        alert("Ошибка при запросе данных ;(");
        console.error(error);
       }
      }
       fetchData();
     }, []);

  
  const onAddToCart = async (obj) => {
   try {
    if (cartItems.find( (fcartObj) => fcartObj.id === obj.id) ) {
      setCartItems(prev => prev.filter(item => item.id !== obj.id));
      await axios.delete(`http://localhost:3004/cart/${obj.id}` ) 
    } else {
      setCartItems(prev => [...prev, obj]);   /// prevsate (prev => [...prev, obj]) вместо [...cartItems, obj] - создает новый массив, берет все предыдущие данные, добавляет obj в конец, возвращает новый массив и заменяет его в cartItems
                                              /// т.е prev функция не сохранится в cartItems, она вызовется, передаст туда то, что есть в ней сейчас и вернет  новый массив
      await axios.post('http://localhost:3004/cart', obj)  //// сохранение добаленных оваров в БД - передаем объект по ссылке в БД
      // .then(res => console.log(res.data));
    }                     
   } catch (error) {
    alert("Ошибка при добавление товара в корзину ;(");
    console.error(error);
   }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favoritesItems.find( (favObj) => favObj.id === obj.id) ) {
        setFavorites((prev) => prev.filter(item => item.id !== obj.id)); 
        await axios.delete(`http://localhost:3004/favorites/${obj.id}`); 
      } else { 
        const {data} = await axios.post('http://localhost:3004/favorites', obj)  //// сохранение добаленных оваров в БД - передаем объект по ссылке в БД 
        setFavorites(prev => [...prev, data]);   /// ОТОБРАЖАЕМ ТО ЧТО ЕСТЬ В Favorites    
      }                                       /// prevsate (prev => [...prev, obj]) вместо [...cartItems, obj] - создает новый массив, берет все предыдущие данные, добавляет obj в конец, возвращает новый массив и заменяет его в cartItems
                                              /// т.е prev функция не сохранится в cartItems, она вызовется, передаст туда то, что есть в ней сейчас и вернет  новый массив
    } catch (error) {
        alert("Не удалось добавить в избранное");
        console.error(error);
      }
    }                                     
 
  const onRemoveCartItem =  async (id) => {
    try {
      setCartItems(prev => prev.filter(item => item.id !== id)); /// очищаем то, что есть в корзине на сайте
      axios.delete(`http://localhost:3004/cart/${id}`)  //// добаление товаров в БД - передаем объект по ссылке в БД
    } catch (error) {
      alert("Не удалось удалить товар из корзины");
      console.error(error);
    }
  }

 
  const onChangeSearchInput = (event) => {
    console.log(event.target.value);
    let inputText = event.target.value;
     setSearchValue(inputText);
  }


  const isItemsCartAdded = (id) => {
    return cartItems.some((obj) => obj.id === id);   ///  проверка на статус добавленных в корзину товаров в массиве cartItems
  } 
  
  const isItemsFavorAdded = (id) => {
    return favoritesItems.some((obj) => obj.id === id);   ///  проверка на статус добавленных в корзину товаров в массиве cartItems
  } 

    return (
     < AppContext.Provider value={{ 
        items, 
        cartItems, 
        favoritesItems, 
        isItemsCartAdded, 
        isItemsFavorAdded, 
        onAddToCart, 
        onAddToFavorite, 
        setCardOpened, 
        setCartItems
      }}>
        <div className="wrapper clear">
          <div>
            <CartDrawer 
            items={cartItems} 
            onClose={() => setCardOpened(false)} 
            onRemove={onRemoveCartItem}
            opened = {cartOpened}
            /> 
          </div>
        <Header onClickCart={ () => setCardOpened(true)} />
        <Routes>
            <Route path="/favorites" exact element= { <Favorites />} />
            <Route path="/orders" exact element= { <Orders />} />
            <Route path="/" exact element= {
              <Home 
                items={items} 
                cartItems={cartItems}
                favoritesItems={favoritesItems} 
                searchValue={searchValue} 
                setSearchValue={setSearchValue} 
                onChangeSearchInput={onChangeSearchInput} 
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite} 
                isLoading={isLoading}
              />} />
        </Routes>  
        </div>
      </AppContext.Provider>
    ); 
}
export default App;
 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      