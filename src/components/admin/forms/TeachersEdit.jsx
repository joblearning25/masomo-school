import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const TeachersEdit = () => {
    const {token}=useContext(AuthContext)
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [subject,setSubject]=useState('')
    const navigate=useNavigate()
    // recieve data from the teachers component
    const {state}=useLocation()
    const selectedTeacher=state?.teacherData
    console.log(selectedTeacher)
    // we prapare our authheader
    const authHeader={
        headers: {Authorization:`Bearer ${token}`}
    }

    // useEffect to update the hooks/state in this component
    useEffect(()=>{
        if (!selectedTeacher) {
            toast.error("No teacher data provided")
            setTimeout(()=>{
                navigate('/admin-dashboard/teachers')
            },2000)
            return            
        }
        setName(selectedTeacher?.name||'')
        setEmail(selectedTeacher?.email || '')
        setPhone(selectedTeacher?.phone)
        setSubject(selectedTeacher?.subject || '')

    },[selectedTeacher,navigate])

    // handle submit
    const handleSubmit=async (e) => {
        e.preventDefault()
        try {
            toast.info("Updating...")
            const data={name,email,phone,subject}
            const res= await axios.put(`https://schoolapi-92n6.onrender.com/api/teacher/${selectedTeacher._id}`,data,authHeader)
            toast.dismiss()
            toast.success(res.data?.message || 'Teacher Updated Successfully')
            navigate('/admin-dashboard/teachers')
        } catch (error) {
            toast.dismiss()
            toast.error(error.response?.data?.message  || 'Error submitting') 
        }        
    }

  return (
    <div className='container mt-2'>
            <ToastContainer position='top-right' autoClose={3000}/>
    
            {/* breadcrums provide ease in path location */}
            <nav aria-label='breadcrumb' className='mb-3'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item fw-bold'><Link to='/admin-dashboard'>Dashboard </Link></li>
                    <li className='breadcrumb-item fw-bold'><Link to='/admin-dashboard/teachers'>Teachers </Link></li>
                    <li className='breadcrumb-item- active' aria-label='page'> / Update Teacher</li>
                </ol>
            </nav>
            
            <div className="card p-4 shadow-sm mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className='text-success '> 
                        <i className='bi bi-person-badge-fill me-2'></i> Update Teacher
                    </h5>
    
                    <Link className='btn btn-success' to={'/admin-dashboard/teachers'}>
                    <i className='bi bi-arrow-left-circle-fill me-2'></i>Back
                    
                    </Link>
                </div>
    
                {/* form to post the teacher */}
                <form onSubmit={handleSubmit} >
                    <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <input type="text" className='form-control' placeholder='Name of the teacher' value={name}  onChange={(e)=>setName(e.target.value)} required/>
                        </div>
    
    
                        <div className='col-md-6 mb-3'>
                            <input type="text" className='form-control' placeholder='Email address' value={email}  onChange={(e)=>setEmail(e.target.value)} required/>
                        </div>
    
                        <div className='col-md-6 mb-3'>
                            <input type="number" className='form-control' placeholder='Phone' value={phone}  onChange={(e)=>setPhone(e.target.value)} required/>
                        </div>
    
                        <div className='col-md-6 mb-3'>
                            <input type="text" className='form-control' placeholder='Subject' value={subject}  onChange={(e)=>setSubject(e.target.value)} required/>
                        </div>
    
                    </div>
                    <button type='submit' className='btn btn-success'>
                        <i className='bi bi-save me-2'></i>Update Teacher
                    </button>
                </form>
    
            </div>
    
        </div>
  )
}

export default TeachersEdit