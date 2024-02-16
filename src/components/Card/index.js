import React from 'react';
import ContentLoader from "react-content-loader";
import AppContext from '../../context';
import styles from './Card.module.scss';

function Card({id, imageUrl, title, price, onFavorite, onPlus, favorited = false, loading = false }){
 
    const {isItemsCartAdded, isItemsFavorAdded} = React.useContext(AppContext);
    const obj = {id, imageUrl, title, price};
  //  const [isFavorite, setIsFavorite]= React.useState(favorited);

    const onClickPlus = () => { /// изменение состояние кнопки
        onPlus(obj);
    }

    const onClickFavorite = () => {   /// изменение состояние кнопки
      //  onFavorite({id, imageUrl, title, price, isFavorite});        
       // setIsFavorite(!isFavorite);
      //  favorited = isItemsFavorAdded(id);
        onFavorite(obj);  
    }


   // React.useEffect(() => {
   //    console.log('Переменная изменилась');
   // },[isAdded, isFavorite]);
 

    return (
  
    <div className={styles.card}>

    {loading ?  (
        <ContentLoader 
            speed={2}
            width={175}
            height={255}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"    
        >
            <rect x="1" y="0" rx="10" ry="10" width="155" height="155" /> 
            <rect x="0" y="167" rx="5" ry="5" width="155" height="15" /> 
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
            <rect x="1" y="234" rx="5" ry="5" width="80" height="25" /> 
            <rect x="120" y="230" rx="10" ry="10" width="33" height="33" />
        </ContentLoader>
        ) : (  
            <>    
            <div className={styles.favorite} >
                { onFavorite &&<img onClick={onClickFavorite} src={ isItemsFavorAdded(id) ? "img/heart-liked.svg" : "img/unliked.svg"} alt="Favorite"/>}
            </div>
            <img height={130} width='100%' src={imageUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price}</b>
                </div>
                { onPlus && <img className={styles.plus} onClick={onClickPlus} src={ isItemsCartAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"}  alt="addToCart" /> }  
            </div>
            </> 
            )}
    </div>
    );
  }

  export default Card;
                                                                                                                                                                       