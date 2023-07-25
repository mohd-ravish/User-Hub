import { MdClose } from "react-icons/md";

function UpdateForm({ handleUpdate, handleClose, handleChange, data }) {
  return (
    <div className="addContainer">
      <div className="form">
        <h2>Edit User<div className="close-btn" onClick={handleClose}><MdClose /></div></h2>
        <label htmlFor="name">Name : </label>
        <input type="text" id="name" name="name" autoComplete='off' onChange={handleChange} value={data.name} required />

        <label htmlFor="name">Email : </label>
        <input type="email" id="email" name="email" onChange={handleChange} value={data.email} required />

        <label htmlFor="mobile">Mobile : </label>
        <input type="number" id="mobile" name="mobile" autoComplete='off' onChange={handleChange} value={data.mobile} required />

        <button onClick={handleUpdate} className="btn">Update</button>
      </div>
    </div>
  )
}

export default UpdateForm;