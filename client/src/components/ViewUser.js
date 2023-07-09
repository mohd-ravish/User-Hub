import { MdClose } from "react-icons/md";
import { GrMail } from "react-icons/gr";
import { BsFillTelephoneFill } from "react-icons/bs";

function ViewUser({ handleClose, data }) {

    var date = new Date();

    return (
        <div className="viewContainer">
            <div className="card">
                <div className="close-btn" onClick={handleClose}><MdClose /></div>
                <div class="image">
                    <img src="Assets/user.png" alt="user" />
                    {/* <p>ID: {data._id}</p> */}
                </div>
                <h2>{data.name}</h2>
                <div className="info">
                    <p><GrMail /> {data.email}</p>
                    <p><BsFillTelephoneFill /> +91 {data.mobile}</p>
                </div>
                <footer className="footer">
                    <p>Copyright ⓒ {date.getFullYear()}</p>
                </footer>
            </div>
        </div>
    )
}

export default ViewUser;