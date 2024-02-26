import axios from "axios";
import {useEffect, useState} from "react";

export default function editProduct() {
  const { id } = useParams();
  const [product_type, setProductTypes] = useState([]);
    const [input, setInput] = useState({
        name : '',
        price:'',
        unit: '',
        decription:'',
        url:'',
        protypeId:'',
        author:''

      
      },[])


    useEffect ( ()=>{
        setInput({
            name: item?.name,
            price:item?.price,
            unit: item?.unit,
            decription: item?.decription,
            url: item?.url,
            protypeId:item?.protypeId,
            author:item?.author
            
        })
    },[item?.id])

    const hdlChange = e => {
        setInput( prv => ( {...prv, [e.target.name] : e.target.value} ))
    
    const hdlSubmit = async (e) => {
        try{
          e.preventDefault()
          const output = { ...input }
          const token = localStorage.getItem('token')
          const rs = await axios.put(`http://localhost:8000/admin/updateproduct/${id}`, output,{
            headers : { Authorization : `Bearer ${token}`}
          })
          alert('Update Product Completed')
        }catch(err) {
          alert(err.message)
        }
      }
      useEffect(() =>{
        const getProList = async ()=>{
          const token = localStorage.getItem('token')
          const rs1 = await axios.get('http://localhost:8000/admin/getProList', {
              headers : { Authorization : `Bearer ${token}`}
            })
            setProductTypes(rs1.data.product_type)
        }
        getProList();
      
      },[])
    
    return (
        <form className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-6"
        onSubmit={hdlSubmit}
    >
      <div className="text-3xl mb-5 ml-20 font-bold">Create Product</div>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="name"
          value={input.name}
          onChange={hdlChange}
        />
      </label>


     <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">price</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="price"
          value={input.price}
          onChange={hdlChange}
        />
      </label>

      
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">unit</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="unit"
          value={input.unit}
          onChange={hdlChange}
        />
      </label>

      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">decription</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="decription"
          value={input.decription}
          onChange={hdlChange}
        />
      </label>

      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">url</span>
        </div>
        <input
          type="text"
          placeholder="ใส่ลิงค์รูปภาพ"
          className="input input-bordered w-full "
          name="url"
          value={input.url}
          onChange={hdlChange}
        />
      </label>

      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Product-Type</span>
        </div>
      <select name="protypeId" value={input.product_type} onChange={hdlChange} >
        <option value="">{product.name}</option>
        {product_type.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      </label>
      <button className="btn btn-primary">Add new</button>
      <button type="submit" className="btn btn-primary" >Update</button>
      {/* <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button> */}
    </form>
    )}}
