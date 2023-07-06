import './App.css';
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [addSection, setAddSection] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  })

  const [dataList, setDataList] = useState([])

  const handleChange = (e) => {
    const { value, name } = e.target
    setFormData((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  }

  // const fetchData = async() => {
  //   axios.get("http://localhost:4500/")
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    Axios.post("http://localhost:4500/create", formData)
    // fetchData();
    // console.log(data)
    setAddSection(false)
  }

  useEffect(() => {
    Axios.get("http://localhost:4500/").then((Response) => {
      setDataList(Response.data)
    });
  }, []);

  const handleDelete = async(id)=>{
   const data = await Axios.delete("http://localhost:4500/delete/"+id);
    // alert(data)
    // fetchData();
  }

  return (
    <div className="container">
      <button className='btn btn-add' onClick={() => setAddSection(true)}>ADD</button>
      {
        addSection && (
          <div className="addContainer">
            <form onSubmit={handleSubmit}>
              <div className="close-btn" onClick={() => setAddSection(false)}><MdClose /></div>
              <label htmlFor="name">Name : </label>
              <input type="text" id="name" name="name" onChange={handleChange} />

              <label htmlFor="name">Email : </label>
              <input type="email" id="email" name="email" onChange={handleChange} />

              <label htmlFor="mobile">Mobile : </label>
              <input type="number" id="mobile" name="mobile" onChange={handleChange} />

              <button className="btn">Submit</button>
            </form>
          </div>
        )
      }

      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              dataList.map((dataItem) => {
                return (
                  <tr>
                    <td>{dataItem.name}</td>
                    <td>{dataItem.email}</td>
                    <td>{dataItem.mobile}</td>
                    <td>
                      <button className='btn btn-edit'>Edit</button>
                      <button className='btn btn-delete' onClick={()=>{handleDelete(dataItem.id)}}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
