import './App.css';
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  // Submit Data
  const handleSubmit = async () => {
    Axios.post("http://localhost:4500/save", formData)
      .then(fetchData())
      .then(toast.success("Data Submitted!", {
        position: toast.POSITION.TOP_CENTER
      }))
    setAddSection(false)
    // window.location.reload();
  }

  // Fetch Data from api
  const fetchData = () => {
    Axios.get("http://localhost:4500/get").then((res) => {
      setDataList(res.data)
    })
      .catch((err) => {
        console.log(err)
      })
  }

  // Show Data
  useEffect(() => {
    fetchData()
  }, []);

  // Delete Data
  const handleDelete = async (id) => {
    Axios.delete("http://localhost:4500/delete/" + id)
      .then(fetchData())
      .then(toast.success("Data Deleted!", {
        position: toast.POSITION.TOP_CENTER
      }))
    // window.location.reload();
  }

  return (
    <div className="container">
      <header>
        <img src="Assets/user.png" alt="logo"></img>
        <h1>User Hub<button onClick={() => setAddSection(true)}>ADD USER</button> </h1>
      </header>
      <ToastContainer />
      {addSection ? (
        <div className="addContainer">
          <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={() => setAddSection(false)}><MdClose /></div>
            <label htmlFor="name">Name : </label>
            <input type="text" id="name" name="name" autoComplete='off' onChange={handleChange} required />

            <label htmlFor="name">Email : </label>
            <input type="email" id="email" name="email" onChange={handleChange} required />

            <label htmlFor="mobile">Mobile : </label>
            <input type="number" id="mobile" name="mobile" autoComplete='off' onChange={handleChange} required />

            <button className="btn">Submit</button>
          </form>
        </div>
      ) : (
        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (
                dataList.map((dataItem) => {
                  return (
                    <tr>
                      <td>{dataItem.name}</td>
                      <td>{dataItem.email}</td>
                      <td>{dataItem.mobile}</td>
                      <td>
                        <button className='btn btn-edit'>Edit</button>
                        <button className='btn btn-delete'
                          onClick={() => { handleDelete(dataItem._id) }}>Delete</button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <div className='no-data'>
                  <p>No Data Found!</p>
                </div>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
