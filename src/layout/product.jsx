import axios from 'axios';    
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'; // นำเข้า Link จาก react-router-dom

export default function product() {
  const { user } = useAuth();
  const [user_id, setUserId] = useState('');
  const [product_id, setProductId] = useState('');
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    const product_id = localStorage.getItem('product_id');
    if (user_id && product_id) {
      setUserId(user_id);
      setProductId(product_id);
    }

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/auth/product', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const hdlSubmit = async (item) => {
    const token = localStorage.getItem('token');
    const rs = await axios.post("http://localhost:8000/auth/addtocart", {
      price: item.price,
      product_id: item.id,
      user_id,
    },{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  return (
    <div className='grid grid-cols-4 grid-rows-4 gap-4 pt-12'>
      {product.map((item) => (
        <div key={item.id} className="card card-compact w-60 bg-base-100 shadow-xl cursor-pointer active:shadow-lg active:translate-x-2 active:translate-y-2">
          <figure><img src={item.url} alt="book" className='px-10 pt-10' /></figure>
          <div className="card-body font-bold">
            <h2 className="card-title">{item.name}</h2>
            <p className="cart-price text-red-500">{item.price} บาท</p>
            <div className="card-actions justify-center">
              <button className="btn bg-yellow-500 rounded-full text-black" onClick={() => hdlSubmit(item)}>เพิ่มใส่ตะกร้า</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
