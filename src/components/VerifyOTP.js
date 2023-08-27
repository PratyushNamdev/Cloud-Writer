import React, { useState , useContext} from "react";
import OtpInput from "react-otp-input";
import otpImage from "./imgs/password.png";
import './Style/verifyotp.css';
import AuthContext from "./context/auth/AuthContext";
export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const {checkOTP , email} = useContext(AuthContext);
  return (
    <div className="otp-container">
    <div className="otp-div"><img src={otpImage} alt="enter Otp"/></div>
    <header className="otp-header">
        <h3>Enter Verification Code</h3>
        <p>Code is sent on {email} </p>
    </header>
      <div className="otpInput">
        <OtpInput 
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          containerStyle={'otp-input-container'}
      inputStyle={'otp-input'}
        />
        <button onClick={()=>{
            checkOTP(otp);
        }} className="otpbtn">Done</button>
      </div>
    </div>
  );
}
