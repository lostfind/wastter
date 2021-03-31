import { authService } from "fbase";
import { useState } from "react";

const EmailVerify = () => {
  const [message, setMessage] = useState("");

  const onEmailVerifyClick = () => {
    authService.currentUser.sendEmailVerification().then(function () {
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
