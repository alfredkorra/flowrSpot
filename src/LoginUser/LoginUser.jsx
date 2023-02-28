import React, { useState, useRef } from "react";
import { logout, signInUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import Profile from "../Profile/Profile";
import Modal from "../Modal/Modal";
import "./LoginUser.scss";

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const modalRef = useRef(null);
 
  //Error State
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
;
  const dispatch = useDispatch();
  
  function hideModal() {
    if (modalRef.current) {
      modalRef.current.style.display = "none";
    }
  }
  const handleLogin = () => {
    let isValid = true;
    if (email.trim() === "") {
      isValid = false;
      setEmailError("Field is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
    if (password.trim() === "") {
      isValid = false;
      setPasswordError("Field is required");
    } else {
      setPasswordError("");
    }
    if (isValid) {
      hideModal();
      dispatch(signInUser({ email, password }));
      setModalContent(<Profile />);
      setShowModal(true);
    }
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  return (
    <form className="login-form">
      <h4>Welcome Back</h4>
      <div className="footer_content">
        <label className="email_label__login">Email Adrees</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>{emailError}</span>
        <label className="password_label_login">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>{passwordError}</span>
        <button
          type="button"
          className="create_account_btn"
          onClick={handleLogin}
        >
          Login to your Account
        </button>
      </div>
      <div ref={modalRef}>
      {showModal && (
        <Modal onRemoveModal={hideModalHandler}>{modalContent}</Modal>
      )}

      </div>
    </form>
  );
}
export default LoginUser;
