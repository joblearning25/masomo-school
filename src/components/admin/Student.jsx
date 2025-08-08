import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const Student = () => {
    const [students,setStudents]=useState([])
    const {token}=useContext(AuthContext)
    const navigate=useNavigate()
    // we prapare our authheader
    const authHeader={
        headers: {Authorization:`Bearer ${token}`}
    }

    // console.log('FetchClasses')
    const FetchStudents=async () => {
        try {
            toast.info("Loading Students...")
            const res=await axios.get('https://schoolapi-92n6.onrender.com/api/student',authHeader)
            console.log(res.data)
            setStudents(res.data)
            console.log(students)
            toast.dismiss()
        } catch (error) {
            toast.dismiss()
            toast.error(error.response?.data?.message || 'Failed to load Students')
        }    
    }
    
    // we use the useeffect so that the fetch class function get executed immediately the component has 
    // been mouted
    useEffect(()=>{
        FetchStudents()
    },[])

    // delete function
    const handleDelete=async (id) => {
        if (window.confirm('Delete this student')) {
            try {
                toast.warning('Deleting student...')
                const res=await axios.delete(`https://schoolapi-92n6.onrender.com/api/student/${id}`,authHeader)
                toast.info(res.data.message)
                console.log(res.data)
                FetchStudents()
            } catch (error) {
                toast.dismiss()
                toast.error(error.response?.data?.message)
                console.log(error.response.data)
            }            
        }        
    }

    // handle edit
    const handleEdit=(studentData)=>{
        navigate('/admin-dashboard/students/edit', {state:{studentData}})
    }
  return (
    <div className=' container mt-2'>
        <ToastContainer position='top-right' autoClose={3000}/>

        {/* breadcrums provide ease in path location */}
        <nav aria-label='breadcrumb' className='mb-3'>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item fw-bold'><Link to='/admin-dashboard'>Dashboard </Link></li>
                <li className='breadcrumb-item- active' aria-label='page'> / Students</li>
            </ol>
        </nav>

        {/* card */}
        <div className="card p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className='text-success '> 
                    <i className='bi bi-person-badge-fill me-2'></i>Students list
                </h5>

                <button className='btn btn-success'
                onClick={()=>navigate('/admin-dashboard/students/add')}>
                    <i className='bi bi-plus-circle'></i>Add Student
                </button>
            </div>
            {/* list of the classes */}
            <div className="table-responsive">
                {students.length ===0?(
                    <div className="alert alert-warning text-center">
                        <i className='bi bi-exclamation-circle me-2'></i>No Students Found!!
                    </div>
                ):(
                    <table className='table table-striped table-hover table-bordered'>
                        <thead className='table-success'>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Adm No.</th>
                                <th>Gender</th>
                                <th>DOB</th>
                                <th>Classroom</th>
                                <th>Parent</th>
                                <th>Photo</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student,index)=>(
                                <tr key={student._id}>
                                    <td>{index+1}</td>
                                    <td>{student?.name}</td>
                                    <td>{student?.admissionNumber}</td>
                                    <td>{student?.gender}</td>
                                    <td>{new Date(student?.dateOfBirth).toLocaleDateString()}</td>
                                    <td>{`${student?.classroom?.gradeLevel},${student?.classroom?.name}` || ''}</td>
                                    <td>{`${student?.parent?.name},${student.parent?.phone}` || ''}</td>
                                    <td>
                                      {student.photo ? (
                                        <img src={`https://schoolapi-92n6.onrender.com/${student.photo}`} 
                                          alt="Student" 
                                          width={60}
                                          height={60}
                                          style={{objectFit:'cover', borderRadius:'50%'}}/>
                                      ):(
                                        'No Photo'
                                      )}
                                    </td>
                                    <td>
                                        <button className='btn btn-sm btn-warning me-2'
                                            onClick={()=>handleEdit(student)}
                                        >
                                            <i className='bi bi-pencil-square'></i>
                                        </button>

                                        <button className='btn btn-sm btn-danger me-2'
                                        onClick={()=>handleDelete(student._id)}
                                        >
                                            <i className='bi bi-trash'></i>
                                        </button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>

                    </table>
                )}
            </div>
        </div>

    </div>
  )
}

export default Student