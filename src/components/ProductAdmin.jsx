import axios from 'axios';    
import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'


export default function product() {
  const [product, setProduct] = useState([])

  useEffect(() => {
    const fetchMenutems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/auth/product', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching menutems:', error);
      }
    };

    fetchMenutems();
  }, []);
  const hdlDelete = async (e, id) =>{
    try {
        e.stopPropagation()
        const token = localStorage.getItem('token')
          const rs = await axios.delete(`http://localhost:8000/admin/deleteProduct/${id}`, {
            headers : { Authorization : `Bearer ${token}`}
          })
          alert('Delete Successful')
          location.reload()
          setTrigger(prv=>!prv)
    } catch (err) {
      console.log(err)
    }
  
  }
  const navigate = useNavigate()

  const hdlEdit = () => {
    navigate('/editProduct')
  }
  const Modal =({item}) =>{
    const modalId = `my_modal_2${item.id}`;
    const [editData, setEditData] = useState({
      name: item?.name,
      price:item?.price,
      unit: item?.unit,
      decription: item?.decription,
      url: item?.url,
      protypeId:item?.protypeId,
      author:item?.author
    })
    const [isEditing, setEditing] = useState(false);

    const handleEditCilck = () => {
      setEditData({ ...table });
      setEditing(true);
    };
  
    const handleSaveClick = async (e) => {
      setEditing(false);
      try{
        e.stopPropagation()
        const id = item.id;
        const apiUrl =`http://localhost:8000/admin/updateproduct/${id}`;
       
        await axios.patch(apiUrl, editData);

        location.reload();
        setEditing(false);
        document.getElementById(modalId).close();
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการแก้ไข", error);
      }
    };
  
  
    const handleChange = (e) => {
      setEditData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    };

    return<dialog id={modalId} className="modal">
    {console.log(modalId)}
    <div className="modal-box">
      <h3 className="font-bold text-lg mb-5 ">
        แก้ไขข้อมูลประเภทโต๊ะ
      </h3>
     {/* <h3 className="text-lg mb-5">ภาพ : {isEditing ? <input type="text" name="table_img" value={editData.table_img} onChange={handleChange}></input>: table.table_img}</h3> */}
     <h3 className="text-lg mb-5">ชื่อโต๊ะ : {isEditing ? <input type="text" name="table_name" value={editData.name} onChange={handleChange}></input>: table.table_name}</h3>
     {/* <h3 className="text-lg mb-5">สถานะ : {isEditing ? <input type="text" name="table_status" value={editData.table_status} onChange={handleChange}></input>: table.table_status}</h3> */}
     <h3 className="text-lg mb-5">ราคา : {isEditing ? <input type="text" name="table_price" value={editData.price} onChange={handleChange}></input>: table.table_price}</h3>
     <div className="flex justify-end">
{isEditing ? (
<button className=" btn btn-success" onClick={handleSaveClick}>บันทึก</button>
): (
<button className=" btn btn-warning" onClick={handleEditCilck}>แก้ไข</button>
)}
     </div>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button onClick={() => document.getElementById(modalId).close()}>
        Close
      </button>
    </form>
  </dialog>
};


  

  
  

  return (
    
<div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>image</th>
                <th>name</th>
                <th>price</th>
                <th>แก้ไข</th>
                <th>ลบ</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {product.map((item) => (
                <tr key={item.id} item ={item}>
                  <th>{item.id}</th>
                  <th><figure><img src={item.url} alt="book" className='px-10 pt-10 max-w-xs max-h-xs' /></figure></th>
                  <th>{item.name}</th>
                  <th>{item.price}</th>
                  {/* <Link to={`/editProduct/${item.id}`}> */}
                  <th><button className="btn btn-warning" onClick={() => document.getElementById(modalId).showModal()}>แก้ไข</button></th>
                  {/* </Link> */}
                  <th><button className="btn btn-error" type="button"onClick={(e) => hdlDelete(e, item.id)}>ลบสินค้า</button></th>
             
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  );
              }
