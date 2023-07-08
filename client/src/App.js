import './App.css';
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import SubmitForm from "./components/SubmitForm.js"
import UpdateForm from "./components/UpdateForm.js"

function App() {

  const [addSection, setAddSection] = useState(false)
  const [editSection, setEditSection] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  })

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: ""
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

  const handleEditChange = (e) => {
    const { value, name } = e.target
    setEditFormData((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  }

  // Submit Data
  const handleSubmit = () => {
    Axios.post("http://localhost:4500/save", formData)
      // .then(fetchData())
      // .then(toast.success("Data Submitted!", {
      //   position: toast.POSITION.TOP_CENTER
      // }))
    setAddSection(false)
    window.location.reload();
  }

  // Update Data
  const handleUpdate = () => {
    // e.preventDefault();
    Axios.put("http://localhost:4500/update", editFormData)
      // .then(fetchData())
      // .then(toast.success("Data Updated!", {
      //   position: toast.POSITION.TOP_CENTER
      // }))
    setEditSection(false)
    window.location.reload();
  }

  const edit = (dataItem) => {
    setEditFormData(dataItem)
    setEditSection(true)
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
  const handleDelete = (id) => {
    Axios.delete("http://localhost:4500/delete/" + id)
      // .then(fetchData())
      // .then(toast.success("Data Deleted!", {
      //   position: toast.POSITION.TOP_CENTER
      // }))
    window.location.reload();
  }

  return (
    <div className="container">
      <header>
        <img src="Assets/user.png" alt="logo"></img>
        <h1>User Hub<button onClick={() => setAddSection(true)}>ADD USER</button> </h1>
      </header>
      {/* <ToastContainer /> */}
      {addSection && (
        <SubmitForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleClose={() => setAddSection(false)}
        />
      )}
      {editSection && (
        <UpdateForm
          handleUpdate={handleUpdate}
          handleChange={handleEditChange}
          handleClose={() => setEditSection(false)}
          data={editFormData}
        />
      )}
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
                      <button className='btn btn-edit'
                        onClick={() => { edit(dataItem) }}><FiEdit3/></button>
                      <button className='btn btn-delete'
                        onClick={() => { handleDelete(dataItem._id) }}><RiDeleteBin6Line/></button>
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
    </div>
  );
}

export default App; 
