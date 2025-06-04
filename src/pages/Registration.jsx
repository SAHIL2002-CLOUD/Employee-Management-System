import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/bg.png";
import styles from "../css/registration.module.css";
import axios from "axios";
const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    mail: "",
    pwd: "",
    cpwd: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let tempErrors = {};
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.fname.trim()) tempErrors.fname = "First Name is Required!";
    if (!formData.lname.trim()) tempErrors.lname = "Last Name is Required!";

    if (!formData.mail.trim()) {
      tempErrors.mail = "Email is Required!";
    } else if (!mailRegex.test(formData.mail)) {
      tempErrors.mail = "Invalid Email Format";
    }

    if (!formData.pwd) {
      tempErrors.pwd = "Password is Required!";
    } else if (!pwdRegex.test(formData.pwd)) {
      tempErrors.pwd =
        "Password must be at least 8 characters long and include a number";
    }

    if (!formData.cpwd) {
      tempErrors.cpwd = "Confirm Your Password";
    } else if (formData.cpwd !== formData.pwd) {
      tempErrors.cpwd = "Passwords do not match!";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (validate()) {
  //     console.log("Register Successfully", formData);
  //     navigate("/");
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      console.log("Submitting form data:", formData);
      try {
        const response = await axios.post("http://localhost:8080/api/employees/register", {
          firstName: formData.fname,
          lastName: formData.lname,
          email: formData.mail,
          password: formData.pwd,
        });

        alert("Registration successful!");
        navigate("/login");
      } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Email might already be in use.");
      } finally {
        setLoading(false);
      }
    }
  };

  const backToHome = () => {
    const tempErrors = {};
    setErrors(tempErrors)
    navigate('/');
  };

  return (
    <div id={styles.register}>
      <div className={styles.info}>
        <img src={bg} alt="Register" />
        <button id={styles.btn}>
          <Link to="/login">Have An Account?</Link>
        </button>
      </div>
      <div className={styles.header}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.heading}>
            <span>Welcome To</span>
            <h1>REGISTER FORM</h1>
          </div>
          <div className={styles.gridContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                id="fname"
                value={formData.fname}
                onChange={handleChange}
              />
              {errors.fname && (
                <span className={styles.error}>{errors.fname}</span>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                id="lname"
                value={formData.lname}
                onChange={handleChange}
              />
              {errors.lname && (
                <span className={styles.error}>{errors.lname}</span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="mail">Email ID</label>
            <input
              type="email"
              id="mail"
              value={formData.mail}
              onChange={handleChange}
            />
            {errors.mail && <span className={styles.error}>{errors.mail}</span>}
          </div>

          <div className={styles.gridContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="pwd">Password</label>
              <input
                type="password"
                id="pwd"
                value={formData.pwd}
                onChange={handleChange}
              />
              {errors.pwd && <span className={styles.error}>{errors.pwd}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cpwd">Confirm Password</label>
              <input
                type="password"
                id="cpwd"
                value={formData.cpwd}
                onChange={handleChange}
              />
              {errors.cpwd && (
                <span className={styles.error}>{errors.cpwd}</span>
              )}
            </div>
          </div>

          <div id={styles.buttons}>
            <button id={styles.registerbtn} type="submit">
              Register
            </button>
            <button id={styles.registerbtns} type="button" onClick={backToHome}>Back To Home</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
