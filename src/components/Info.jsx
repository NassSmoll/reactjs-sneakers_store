import React from 'react'
import AppContext from '../context';

const Info = ( { image, title, description} ) => {

    const {setCardOpened} = React.useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">      
        <img className="mb-20" width={120} src={image} alt="Empty cart" />
        <h2>{title}</h2>
        <p className="opacity-6 text-center">{description}</p>
        <button onClick={ () => setCardOpened(false) } className="orderBtn greenButton">
            <img src="img/arrow.svg" alt="Arrow" />
            Вернуться назад
        </button>
   </div>
  )
}

export default Info;