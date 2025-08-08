import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminDashboard = () => {
  const [stats, setStats]=useState({
    totalClassrooms:0,
    totalParents:0,
    totalTeachers:0,
    totalStudents:0,
    activeUsers:0,
    recentTeachers:[],
    recentStudents:[]
  })
  const {token}=useContext(AuthContext)
  // we prapare our authheader
  const authHeader={
      headers: {Authorization:`Bearer ${token}`}
  }

  const fecthStats=async () => {
    try {
      const res =await axios.get('https://schoolapi-92n6.onrender.com/api/admindash/',authHeader)
      setStats(res.data)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{
    fecthStats()
  },[])
  

  return (
    <div className="container my-2" >
      <h2 className="text-center text-success mb-2">Admin Dashboard Overview</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {/* Teachers */}
        <div className="col">
          <div className="card h-100  shadow-lg rounded-4 bg-light hover-card">
            <div className="card-body text-center">
              <div className="icon-circle bg-primary text-white mb-3">
                <i className="bi bi-person-lines-fill fs-3"></i>
              </div>
              <h6 className="text-muted">Teachers</h6>
              <h2 className="fw-bold text-dark">{stats.totalTeachers}</h2>
            </div>
          </div>
        </div>

        {/* Students */}
        <div className="col">
          <div className="card h-100 shadow-lg rounded-4 bg-light hover-card">
            <div className="card-body text-center">
              <div className="icon-circle bg-info text-white mb-3">
                <i className="bi bi-mortarboard fs-3"></i>
              </div>
              <h6 className="text-muted">Students</h6>
              <h2 className="fw-bold text-dark">{stats.totalStudents}</h2>
            </div>
          </div>
        </div>

        {/* Classes */}
        <div className="col">
          <div className="card h-100 shadow-lg rounded-4 bg-light hover-card">
            <div className="card-body text-center">
              <div className="icon-circle bg-warning text-white mb-3">
                <i className="bi bi-journal-bookmark fs-3"></i>
              </div>
              <h6 className="text-muted">Classes</h6>
              <h2 className="fw-bold text-dark">{stats.totalClassrooms}</h2>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="col">
          <div className="card h-100 shadow-lg rounded-4 bg-light hover-card">
            <div className="card-body text-center">
              <div className="icon-circle bg-success text-white mb-3">
                <i className="bi bi-person-check-fill fs-3"></i>
              </div>
              <h6 className="text-muted">Active Users</h6>
              <h2 className="fw-bold text-dark">{stats.activeUsers}</h2>
            </div>
          </div>
        </div>
      </div>


      {/* Recent Teachers */}
      <div className="mt-5">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white">
            <h5><i className="bi bi-person-lines-fill me-2"></i> Recent Teachers</h5>
          </div>
          <div className="card-body">
            {stats.recentTeachers.length === 0 ? (
              <p className="text-muted">No recent teachers.</p>
            ) : (
              <ul className="list-group">
                {stats.recentTeachers.map((teacher, index) => (
                  <li key={index} className="list-group-item">
                    {teacher.name} – {teacher.email}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Recent Students */}
      <div className="mt-4 mb-5">
        <div className="card shadow-lg">
          <div className="card-header bg-info text-white">
            <h5><i className="bi bi-mortarboard me-2"></i> Recent Students</h5>
          </div>
          <div className="card-body">
            {stats.recentStudents.length === 0 ? (
              <p className="text-muted">No recent students.</p>
            ) : (
              <ul className="list-group">
                {stats.recentStudents.map((student, index) => (
                  <li key={index} className="list-group-item">
                    {student.name} – {student.admissionNumber}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminDashboard