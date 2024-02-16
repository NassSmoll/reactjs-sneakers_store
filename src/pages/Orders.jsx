import React from 'react'; 
import axios from 'axios';
import Card from '../components/Card';
 

function Orders(){
  const [ orders, setOrders] = React.useState([]);  /// 
  const [ isLoading, setIsLoading] = React.useState(true);  ///  состояние загрузки товаров
  
  React.useEffect( () => {
   (async () => {
    try {
      const { data } = await axios.get('http://localhost:3004/orders')
      console.log();
      // data.reduce((prev, obj) => console.log(prev, obj), []);
      setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      setIsLoading(false);

    } catch (error) {
      alert('Ишибка при запросе заказов');
      console.error(error);
    }

   })();

  }, []);


  return (
    <div className="content p-40">
    <div className="mb-40 d-flex justify-between align-center">
      <h1>Мое заказы</h1>
 
    </div>

   <div className="d-flex flex-wrap">
   { (isLoading ? [...Array(10)] : orders).map((item,index) => (    /// рендеринг товаров
              <Card        
                key = {index}  
                loading = {isLoading}
                {...item}
                />
          )) }
   </div>

   </div>
);
    }

 export default Orders;