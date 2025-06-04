import React from "react";
import styles from "../src/css/home.module.css";
import { FaUsers, FaBuilding, FaUserPlus, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id={styles.main}>
      <nav id={styles.nav}>
        <h1>EMS</h1>
        <div id={styles.navlink}>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
        </div>
      </nav>

      <div id={styles.header}>
        <h1>Welcome to the Employee Management System</h1>
        <p>Manage Employee and track employee records efficiently</p>
        <button id={styles.get}>
            <Link to='/registration'>Get Started</Link>
        </button>
      </div>

      <section className={styles.features}>
        <div className={styles.card}>
          <div className={styles.icon}>
            <FaUsers size={60} id={styles.icons}/>
          </div>
          <h3>Total Employees</h3>
          <p>View and manage all employees</p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>
            <FaBuilding size={50} id={styles.icons}/>
          </div>
          <h3>Departments</h3>
          <p>Organize employees by department</p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>
            <FaUserPlus size={50} id={styles.icons}/>
          </div>
          <h3>Add Employee</h3>
          <p>Add a new employee to the system</p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>
            <FaFileAlt size={50} id={styles.icons}/>
          </div>
          <h3>Employee Reports</h3>
          <p>Generate and view employee reports</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
