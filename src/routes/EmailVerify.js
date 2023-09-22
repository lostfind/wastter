import { authService } from "fbase";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";

const EmailVerify = () => {
  const [message, setMessage] = useState("");

  const onEmailVerifyClick = () => {
    sendEmailVerification(authService.currentUser).then(function () {
      setMessage("Email Sent");
    });
  };
  return (
    <div>
      {message}
      <button onClick={onEmailVerifyClick} name="verify">
        sendEmailVerification
      </button>
    </div>
  );
};

export default EmailVerify;
