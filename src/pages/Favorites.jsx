import React from 'react'; 
import Card from '../components/Card';
import AppContext from '../context';

function Favorites(){

 const {favoritesItems, isItemsCartAdded, onAddToCart, onAddToFavorite} = React.useContext(AppContext);
 

  return (
    <div className="content p-40">
    <div className="mb-40 d-flex justify-between align-center">
      <h1>Мое избранное</h1>
 
    </div>

   <div className="d-flex flex-wrap">
   { favoritesItems.map((item) => (  /// рендеринг товаров
              <Card 
              key =  {item.id} 
              onPlus = { (obj) => onAddToCart(obj) }
              onFavorite = {(obj) => onAddToFavorite(obj)}
              added = {isItemsCartAdded(item && item.id)}
              {...item}
              />
          )) }
   </div>

   </div>
);
    }

 export default Favorites;