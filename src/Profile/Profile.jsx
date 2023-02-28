import React, { useState, useEffect } from "react";
import UserImg from "../Assets/profile-holder.png";
import axios from "axios";
import './Profile.scss'

const Profile = () => {
  const [userData, setUserData] = useState(false);

  let Api = "https://flowrspot-api.herokuapp.com/api/v1/users/me";

  const UserData = async () => {
    try {
      const response = await axios.get(Api, {
        headers: {
          "Authorization": localStorage.getItem("auth_token"),
          "Content-Type": "application/json",
        },
      });
      const results = response.data.user;
      console.log(results, "results user");
      setUserData(results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      UserData();
    }, 100);
  }, []);

  
    useEffect(() => {
    setTimeout(() => {
      UserData();
    }, 100);
  }, []);
  
  return (
    <div className="profile container">
        <div className="profile_details">
          <img src={UserImg} alt="" />
          <div className="user_name">
            <h6>{userData.first_name}</h6>
            <span>47 sightings</span>
          </div>
        </div>
        <div className="user_info">
          <span>First Name</span>
          <h5>{userData.first_name}</h5>
          <span>Last Name</span>
          <h5>{userData.last_name}</h5>
          <span>Date of Birth</span>
          <h5>June 1,1998</h5>
          <span>Email</span>
          <h5>alfred.korra7@gmail.com</h5>
        </div>
  </div>
  );
};

export default Profile;
