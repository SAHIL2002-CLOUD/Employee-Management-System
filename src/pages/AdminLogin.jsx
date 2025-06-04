import React from "react";
import styles from "../css/login.module.css";
import style from "../css/registration.module.css";
import bg from "../assets/official-logins.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    const newErrors = {};

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 8 && !pwdRegex.test(password)) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Login successful!", [email, password]);
      // You can also do API call here
      navigate("/admindashboard");
    }
    // else{
    //   alert("Login unsuccessful");
    // }
  };

  const backToHome = () => {
    const tempErrors = {};
    setErrors(tempErrors)
    navigate('/');
  };

  return (
    <div id={styles.main}>
      <div id={styles.logins}>
        <form action="" className={styles.form} onSubmit={handleSubmit}>
          <div className={style.heading}>
            <span>Welcome Back</span>
            <h1>Employee Login</h1>
          </div>
          <div className={style.formGroup}>
            <label htmlFor="mail">Email ID</label>
            <input
              type="email"
              id="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className={style.error}>{errors.email}</span>
            )}
          </div>
          <div className={style.formGroup}>
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              id="pwd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className={style.error}>{errors.password}</span>
            )}
          </div>
          <div id={styles.forgot}>
            <Link to='/forgot'>Forgot password ?</Link>
          </div>
          <div id={styles.buttons}>
            <button id={styles.registerbtn} type="submit">
              Login
            </button>
            <button id={styles.registerbtn} type="button" onClick={backToHome}>
              Back To Home
            </button>
          </div>
        </form>
      </div>
      <div id={styles.left}>
        <img src={bg} alt="Login" />
        <button className={styles.btn}>
          <Link to="/registration">Didn't Have Account</Link>
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
