import { MdClose } from "react-icons/md";

function SubmitForm({handleSubmit, handleClose, handleChange})
{
    return(
        <div className="addContainer">
          <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={handleClose}><MdClose /></div>
            <label htmlFor="name">Name : </label>
            <input type="text" id="name" name="name" autoComplete='off' onChange={handleChange} required />

            <label htmlFor="name">Email : </label>
            <input type="email" id="email" name="email" onChange={handleChange} required />

            <label htmlFor="mobile">Mobile : </label>
            <input type="number" id="mobile" name="mobile" autoComplete='off' onChange={handleChange} required />

            <button className="btn">Submit</button>
          </form>
        </div>
    )
}

export default SubmitForm;