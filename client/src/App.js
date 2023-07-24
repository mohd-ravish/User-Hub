import './App.css';
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import AddUser from "./components/AddUser.js"
import UpdateUser from "./components/UpdateUser.js"
import ViewUser from "./components/ViewUser.js"

function App() {

  // const [count, setCount] = useState(0);
  const [addSection, setAddSection] = useState(false)
  const [editSection, setEditSection] = useState(false)
  const [viewSection, setViewSection] = useState(false)

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

  Axios.defaults.withCredentials = true;

  // Submit Data
  const handleSubmit = () => {
    Axios.post("https://user-hub-alpha.vercel.app/save", formData)
    // .then(fetchData())
    // .then(toast.success("Data Submitted!", {
    //   position: toast.POSITION.TOP_CENTER
    // }))
    // setCount(count + 1);
    setAddSection(false)
    window.location.reload();
  }

  // Update Data
  const handleUpdate = () => {
    // e.preventDefault();
    Axios.put("https://user-hub-alpha.vercel.app/update", editFormData)
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

  const view = (dataItem) => {
    setEditFormData(dataItem)
    setViewSection(true)
  }

  // Fetch Data from api
  const fetchData = () => {
    Axios.get("https://user-hub-alpha.vercel.app/get").then((res) => {
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
    Axios.delete("https://user-hub-alpha.vercel.app/delete/" + id)
    // .then(fetchData())
    // .then(toast.success("Data Deleted!", {
    //   position: toast.POSITION.TOP_CENTER
    // }))
    window.location.reload();
  }

  return (
    <div>
      <header>
        {/* <img src="Assets/logo.png" alt="logo"></img> */}
        <h2>User Hub</h2>
        <button className='add-button' onClick={() => setAddSection(true)}>ADD USER</button>
      </header>
      <main className="table">

        {/* <ToastContainer /> */}
        {addSection && (
          <AddUser
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleClose={() => setAddSection(false)}
          />
        )}
        {editSection && (
          <UpdateUser
            handleUpdate={handleUpdate}
            handleChange={handleEditChange}
            handleClose={() => setEditSection(false)}
            data={editFormData}
          />
        )}
        {viewSection && (
          <ViewUser
            // handleUpdate={handleUpdate}
            // handleChange={handleEditChange}
            handleClose={() => setViewSection(false)}
            data={editFormData}
          />
        )}
        <section className='table-body'>
          <table>
            <thead>
              <tr>
                <th> ID <span></span></th>
                <th> Name <span></span></th>
                <th> Email <span></span></th>
                <th> Mobile <span></span></th>
                <th> Actions <span></span></th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (
                dataList.map((dataItem, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{dataItem.name}</td>
                      <td>{dataItem.email}</td>
                      <td>{dataItem.mobile}</td>
                      <td>
                        <button className='btn btn-edit'
                          onClick={() => { view(dataItem) }}>VIEW</button>
                        <button className='btn btn-edit'
                          onClick={() => { edit(dataItem) }}>EDIT</button>
                        <button className='btn btn-edit'
                          onClick={() => { handleDelete(dataItem._id) }}>DELETE</button>
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
        </section>
      </main>
    </div>
  );
}
export default App;