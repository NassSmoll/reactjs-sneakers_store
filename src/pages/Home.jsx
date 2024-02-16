import React from 'react'; 
import Card from '../components/Card';


function Home({
  items, 
  onAddToCart, 
  onAddToFavorite,
  searchValue, 
  setSearchValue, 
  onChangeSearchInput, 
  isLoading
 }) {

const renderItems = () => { 
  const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));  // Фильтрация по поиску items перед рендерингом
  return ( isLoading ? [...Array(10)] : filteredItems).map((item,index) => (  /// рендеринг товаров 
    <Card 
        key = {index}  
        onPlus = { (obj) => onAddToCart(obj) }
        onFavorite = { (obj) => onAddToFavorite(obj)}
        loading = {isLoading}
        {...item}
      />
  )) }

  return (
          <div className="content p-40">
          <div className="mb-40 d-flex justify-between align-center">
            <h1> {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
            <div className="search-block d-flex">
              <img src="img/search.svg" alt="Search"/>
              <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>  
             {searchValue && (
                <img className="clear cu-p" 
                  onClick={() => setSearchValue('')} 
                  width={30} 
                  src="img/btn-remove.svg" 
                  alt="Clear" 
                />
             )}
            </div>
          </div>
    
         <div className="d-flex flex-wrap">
            {renderItems()}
         </div>
    
         </div>
      );
    }

    export default Home;