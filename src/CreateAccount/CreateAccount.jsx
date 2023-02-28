import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import LoginUser from "../LoginUser/LoginUser";
import Modal from "../Modal/Modal";
import { signUpUser } from "../redux/authSlice";
import "./CreateAccount.scss";

const CreateAccount = () => {
  const [first_name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");

  /// Error messages states
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [birthdayError, setBirthdayError] = useState("");
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);
  const modalRef = useRef(null);

  const dispatch = useDispatch();

  const createAccount = () => {
    dispatch(
      signUpUser({ first_name, email, password, last_name, date_of_birth })
    ).then(() => {
      setIsSignUpSuccessful(true);
    });
  };

  const validateForm = () => {
    let isValid = true;
    if (first_name.trim() === "") {
      setNameError("Field is required");
    } else {
      setNameError("");
    }
    if (last_name.trim() === "") {
      isValid = false;
      setLastNameError("Field is required");
    } else {
      setLastNameError("");
    }
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
    if (date_of_birth.trim() === "") {
      isValid = false;
      setBirthdayError("Field is required");
    } else {
      setBirthdayError("");
    }
    return isValid;
  };

  function hideModal() {
    if (modalRef.current) {
      modalRef.current.style.display = "none";
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      hideModal();
      createAccount();
      setIsSignUpSuccessful(true);
      return true;
    } else {
      setIsSignUpSuccessful(false);
      return false;
    }
  };


  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);


  function handleButtonClick() {
    setModalContent(<LoginUser />);
  }

  const hideModalHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="create-account-form">
        {!isSignUpSuccessful ? <h4>Create an Account</h4> : ""}
        {isSignUpSuccessful ? (
          <>
            <p className="succes">
              “Congratulations! You havesuccessfully signed up for FlowrSpot!”
            </p>
            <button
              type="button"
              className="go_to_login"
              onClick={() => handleButtonClick(setShowModal(true))}
            >
              OK
            </button>
          </>
        ) : (
          <>
            <div className="two_col">
              <label className="name">First Name</label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className="name_error">{nameError}</span>
              <label className="surname">Last Name</label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
              <span className="surname_error">{lastNameError}</span>
            </div>
            <div className="footer_content">
              <label className="birthday_label">Date of Birth</label>
              <input
                type="date"
                value={date_of_birth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              <span>{birthdayError}</span>
              <label className="email_label">Email Adrees</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>{emailError}</span>
              <label className="password_label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>{passwordError}</span>
              <button className="create_account_btn">Create Account</button>
            </div>
          </>
        )}
      </form>
      <div ref={modalRef}>
      {showModal && (
        <Modal onRemoveModal={hideModalHandler} ref={modalRef}>
          {modalContent}
        </Modal>
      )}
      </div>
    </>
  );
};

export default CreateAccount;
