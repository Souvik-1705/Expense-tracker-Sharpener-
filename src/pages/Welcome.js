import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";
import VerifyEmail from "./VerifyEmail";

function Welcome() {
  const navigate=useNavigate();
  const handleCompleteProfile=()=>{
      navigate("/complete-profile");
  }
  return (
    <div className="welcome">
      <h1>Welcome to Expense Tracker</h1>
      <p>Your profile is incomplete</p>
      <button onClick={handleCompleteProfile}>Complete Profile</button>
      <VerifyEmail/>
    </div>
  )
}

export default Welcome;