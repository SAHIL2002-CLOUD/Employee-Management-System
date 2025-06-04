import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/dashboard.module.css";
import {
  FaUser,
  FaCalendarCheck,
  FaUmbrellaBeach,
  FaMoneyCheckAlt,
  FaBuilding,
  FaUsers,
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import axios from "axios";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.email} ${emp.id}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <h1 className={styles.logo}>EMS</h1>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard" className={styles.link}>
                <FaHouse className={styles.icon} /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/employee" className={styles.link}>
                <FaUsers className={styles.icon} /> Employees
              </Link>
            </li>
            <li>
              <FaCalendarCheck className={styles.icon} /> Attendance
            </li>
            <li>
              <FaUmbrellaBeach className={styles.icon} /> Leave
            </li>
            <li>
              <FaMoneyCheckAlt className={styles.icon} /> Payroll
            </li>
            <li>
              <FaBuilding className={styles.icon} /> Departments
            </li>
          </ul>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h2>Dashboard</h2>
          <input
            type="text"
            placeholder="Search for Employee..."
            className={styles.searchBar}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className={styles.profileInfo}>
            <span>
              <FaUser className={styles.user} />
            </span>
            <span className={styles.status}>● Active</span>
          </div>
        </header>

        <section className={styles.welcomeBanner}>
          <h2>Welcome Back, Admin</h2>
          <p>You have pending Approvals & Leave Requests</p>
        </section>

        <section className={styles.grid}>
          {["Total Employee", "Present Employee", "Absent Employee", "Departments"].map((item, index) => (
            <div key={index} className={styles.card}>
              <h3>{item}</h3>
              <h3>{item === "Total Employee" ? employees.length : 0}</h3>
            </div>
          ))}
        </section>

        <section className={styles.chartSection}>
          <h3>Recently Active Employees</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Emp ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.firstName}</td>
                    <td>{emp.lastName}</td>
                    <td>{emp.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
