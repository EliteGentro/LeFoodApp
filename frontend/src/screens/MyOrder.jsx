import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// MyOrder component to display user's order history
function MyOrder() {
  const [orderData, setOrderData] = useState("");

  // Function to fetch user's order data from the API
  const fetchMyOrder = async () => {
    const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:5500";
    console.log(localStorage.getItem('userEmail'));
    const response = await fetch(`${API_URL}/api/myOrderData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail')
      })
    });
    const json = await response.json();
    setOrderData(json);
  };

  // useEffect hook to fetch order data on component mount
  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar /> {/* Navbar component */}
      </div>

      <div className='container'>
        <div className='row'>
          {/* Conditionally render order data */}
          {orderData?.orderData?.order_data && orderData.orderData.order_data.slice(0).reverse().map((item, index) => {
            const orderDate = item[0].Order_date; // Extract order date
            const products = item.slice(1); // Extract products

            return (
              <div key={index}>
                <div className='m-auto mt-5'>
                  {orderDate}
                  <hr />
                </div>
                <div className='d-flex flex-wrap gap-3 justify-content-left'>
                  {products.map((product, idx) => (
                    <div className='col-12 col-md-6 col-lg-3 grid' key={idx}>
                      <div className='card mt-4' style={{ width: '16rem', maxHeight: '360px' }}>
                        <div className='card-body'>
                          <h5 className='card-title'>{product.name}</h5>
                          <div className='container w-100 p-0' style={{ height: '100px' }}>
                            <p className='m-1'>{product.qty}</p>
                            <p className='m-1'>{product.size}</p>
                            <p className='m-1'>{orderDate}</p>
                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                              ${product.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {!orderData?.orderData?.order_data && <div>No Orders Found</div>}
        </div>
      </div>

      <div>
        <Footer /> {/* Footer component */}
      </div>
    </div>
  );
}

export default MyOrder;
