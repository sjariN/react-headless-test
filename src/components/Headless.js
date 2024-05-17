import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const [phone,setPhone] = useState(null);
  const callback = (otplessUser) => {
    const emailMap = otplessUser.identities.find(
      (item) => item.identityType === "EMAIL"
    );

    const mobileMap = otplessUser.identities.find(
      (item) => item.identityType === "MOBILE"
    )?.identityValue;

    const token = otplessUser.token;

    const email = emailMap?.identityValue;

    const mobile = mobileMap?.identityValue;

    const name = emailMap?.name || mobileMap?.name;

    console.log(otplessUser);
    // Implement your custom logic here.
  };
  
  useEffect(() => {
    // Load the SDK dynamically
    const script = document.createElement('script')
    script.id = 'otpless-sdk'
    script.type = 'text/javascript'
    script.src = 'https://otpless.com/v2/headless.js'
    script.setAttribute('data-appid',"QPIATJMYM1OGKZNBSNE9")
    script.onload = () => {
        window.OTPlessSignin = new window.OTPless(callback);
    };
    document.head.appendChild(script);
    return () => {
        document.head.removeChild(script);
    };
}, []);

  const oAuth = (channel) => {
    window.OTPlessSignin.initiate({
      channel: "OAUTH",
      channelType: channel,
    });
  };

  const phoneAuth = (phno) => {
    setPhone(phno);
    window.OTPlessSignin.initiate({
        channel: "PHONE",
        phone: phno,
        countryCode: "+91",
    });
};

const verifyOTP = (otp) => {
  window.OTPlessSignin.verify({
      channel: "PHONE",
      phone: phone,
      otp: otp,
      countryCode: "+91",
  });
};

  return (
    <div>
      <div id="mobile-section">
        <input id="mobile-input" placeholder="Enter mobile number" />
        <button onClick={()=>phoneAuth(document.getElementById('mobile-input').value)}>Request OTP</button>
      </div>

      <div id="otp-section">
        <input id="otp-input" placeholder="Enter OTP" />
        <button onClick={()=>verifyOTP(document.getElementById('otp-input').value)}>Verify OTP</button>
      </div>
      <button onClick={() => oAuth("WHATSAPP")}>Authenticate with WhatsApp</button>
      <button onClick={() => oAuth("GMAIL")}>Authenticate with Gmail</button>

      <Link to='/newone'>New-one</Link>
    </div>
  );
};

export default App;