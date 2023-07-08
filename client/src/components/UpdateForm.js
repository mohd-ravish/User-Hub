import { MdClose } from "react-icons/md";

function UpdateForm({handleUpdate, handleClose, handleChange, data})
{
    return(
        <div className="addContainer">
          <form onSubmit={handleUpdate}>
            <div className="close-btn" onClick={handleClose}><MdClose /></div>
            <label htmlFor="name">Name : </label>
            <input type="text" id="name" name="name" autoComplete='off' onChange={handleChange} value={data.name}  required />

            <label htmlFor="name">Email : </label>
            <input type="email" id="email" name="email" onChange={handleChange} value={data.email} required />

            <label htmlFor="mobile">Mobile : </label>
            <input type="number" id="mobile" name="mobile" autoComplete='off' onChange={handleChange} value={data.mobile} required />

            <button className="btn">Update</button>
          </form>
        </div>
    )
}

export default UpdateForm;