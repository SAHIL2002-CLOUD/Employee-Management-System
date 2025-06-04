import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "../css/dashboard.module.css";
import styles from "../css/employee.module.css";
import {
  FaUser, FaCalendarCheck, FaUmbrellaBeach, FaMoneyCheckAlt,
  FaBuilding, FaUsers, FaUserPlus, FaEdit, FaTrash
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/employees/register", newEmployee);
      fetchEmployees();
      setNewEmployee({ firstName: "", lastName: "", email: "", password: "" });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:8080/api/employees/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleEdit = async (id) => {
    const emp = employees.find(e => e.id === id);
    if (!emp) return;

    const updatedFields = {};

    const firstName = prompt("Edit First Name:", emp.firstName);
    if (firstName !== null && firstName !== emp.firstName) updatedFields.firstName = firstName;

    const lastName = prompt("Edit Last Name:", emp.lastName);
    if (lastName !== null && lastName !== emp.lastName) updatedFields.lastName = lastName;

    const email = prompt("Edit Email:", emp.email);
    if (email !== null && email !== emp.email) updatedFields.email = email;

    const password = prompt("Edit Password (leave blank to keep current):");
    if (password !== null && password.trim() !== "") updatedFields.password = password;

    if (Object.keys(updatedFields).length === 0) {
      alert("No changes detected.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/employees/${id}`, updatedFields);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.dashboard}>
      <aside className={style.sidebar}>
        <h1 className={style.logo}>EMS</h1>
        <nav>
          <ul>
            <li><Link to="/dashboard" className={style.link}><FaHouse className={style.icon} /> Dashboard</Link></li>
            <li><Link to="/dashboard/employee" className={style.link}><FaUsers className={style.icon} /> Employees</Link></li>
            <li><FaCalendarCheck className={style.icon} /> Attendance</li>
            <li><FaUmbrellaBeach className={style.icon} /> Leave</li>
            <li><FaMoneyCheckAlt className={style.icon} /> Payroll</li>
            <li><FaBuilding className={style.icon} /> Departments</li>
          </ul>
        </nav>
      </aside>

      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>Employee</h2>
          <div className={styles.profileInfo}>
            <span><FaUser className={styles.user} /></span>
            <span className={styles.status}>● Admin</span>
          </div>
        </div>

        <div className={styles.head2}>
          <input
            type="text"
            placeholder="Search for Employee..."
            className={styles.searchBar}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <div className={styles.controls}>
        
            <button className={styles.addBtn}><FaUserPlus /> Add Employee</button>
          </div> */}
        </div>

        <div className={styles.filters}>
          <h3>Add New Employee</h3>
          <br />
          <h1></h1>
          <form onSubmit={handleAddEmployee} className={style.formInline}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={newEmployee.firstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={newEmployee.lastName}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newEmployee.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newEmployee.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className={styles.addBtn}><FaUserPlus /> Add Employee</button>
          </form>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Emp ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td>
                    <FaEdit className={styles.actionIcon} onClick={() => handleEdit(emp.id)} />
                    <FaTrash className={styles.actionIcon} onClick={() => handleDelete(emp.id)} />
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>No matching employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
