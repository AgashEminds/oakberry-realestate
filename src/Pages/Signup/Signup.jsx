import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../Component/Button/Button";
import { axiosinstance } from "../../Interceptor/Interceptor";
import "./Signup.css";

function Register() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [con_password, setConPassword] = useState("");
  const [images, setimages] = useState(null); // For file input
  const [imageUrl, setImageUrl] = useState(""); // To store the uploaded image URL
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const emailChange = (e) => setemail(e.target.value);
  const nameChange = (e) => setusername(e.target.value);
  const passwordChange = (e) => setPassword(e.target.value);
  const con_passwordChange = (e) => setConPassword(e.target.value);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file
    setimages(selectedFile);
  };

  // Step 1: Upload the image and get the URL
  const uploadImage = async () => {
    if (!images) {
      throw new Error("Please upload an image.");
    }

    const formData = new FormData();
    formData.append("file", images); // Append the image file

    const response = await axios.post("http://localhost:8000/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data.imageUrl)

    return response.data.imageUrl; // Return the uploaded image URL
  };

  // Step 2: Register user with image URL and other form data
  const handlesignup = async () => {
    if (password !== con_password) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Upload the image first and get the URL
      const uploadedImageUrl = await uploadImage();

      setImageUrl(uploadedImageUrl);

      // Register user with form data and image URL
      const response = await axiosinstance.post("/auth/register", {
        username,
        email,
        password,
        images: uploadedImageUrl,
      });

      setSuccess(response.data.message || "Registration successful!");
      navigate("/");
    } catch (err) {
      console.log("Error during signup:", err);
      setError(err.response ? err.response.data.error : "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="parent_register">
      <div className="signup_content">
        <h1>
          <i className="fa-solid fa-cash-register fa-bounce"></i>
          <p>Join Our Club</p>
        </h1>
        <div className="all_details_signup">
          <div className="signup_input">
            <input
              type="text"
              id="name"
              placeholder=""
              required
              value={username}
              onChange={nameChange}
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="signup_input">
            <input
              type="email"
              id="email"
              placeholder=" "
              required
              value={email}
              onChange={emailChange}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="signup_input">
            <input
              type="password"
              id="password"
              placeholder=" "
              required
              value={password}
              onChange={passwordChange}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="signup_input">
            <input
              type="password"
              id="con_password"
              placeholder=" "
              required
              value={con_password}
              onChange={con_passwordChange}
            />
            <label htmlFor="con_password">Confirm Password</label>
          </div>

          <div className="signup_input">
            <input
              type="file"
              id="image"
              required
              onChange={handleFileChange}
            />
          </div>

          <div className="signup_bt">
            <Button
              onClick={handlesignup}
              text={loading ? "Signing Up..." : "Signup"}
              disabled={loading}
            />
          </div>
          <p>
            If you have an account <Link to="/login">Click Here</Link>
          </p>
          <div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {success && <div style={{ color: "green" }}>{success}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
