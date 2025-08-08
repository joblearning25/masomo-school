import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const StudentEdit = () => {
    const {token}=useContext(AuthContext)
    const navigate =useNavigate()

    const [name,setName]=useState('')
    const [dateOfBirth,setdateOfBirth]=useState('')
    const [gender,setGender]=useState('')
    const [admissionNumber,setAdmissionNumber]=useState('')
    const [photo,setPhoto]=useState('')
    const [parentNationalId,setParentNationalId]=useState('')
    const [classroomId,setClassroomId]=useState('')
    const [classrooms,setClassrooms]=useState([])
    const [parentDetails,setParentDetails]=useState([])


    // recieve data from the Students component
    const {state}=useLocation()
    const selectedStudent=state?.studentData
    console.log(selectedStudent)
    // we prapare our authheader
    const authHeader={
        headers: {Authorization:`Bearer ${token}`}
    }

    // useEffect to update the hooks/state in this component
    useEffect(()=>{
        if (!selectedStudent) {
            toast.error("No student data provided")
            setTimeout(()=>{
                navigate('/admin-dashboard/students')
            },2000)
            return            
        }
        setName(selectedStudent?.name||'')
        setAdmissionNumber(selectedStudent?.admissionNumber || '')
        setGender(selectedStudent?.gender)
        setdateOfBirth(selectedStudent?.dateOfBirth? selectedStudent.dateOfBirth.substring(0,10): '')
        setParentNationalId(selectedStudent?.parent?.nationalId || '')
        setClassroomId(selectedStudent?.classroom?._id)
        setPhoto(selectedStudent?.photo || '')
        console.log(selectedStudent.gender)

    },[selectedStudent,navigate])

    const verifyParent=async () => {
      try {
          toast.info("Finding Parent ...")
          const res = await axios.get(`https://schoolapi-92n6.onrender.com/api/parent/${parentNationalId}`,authHeader)
          toast.dismiss()
          toast.error(res?.data?.message)
          if (!res?.data?.message){
              toast.success("Parent have been verified")
          }
          setParentDetails(res.data)
      } catch (error) {
          setParentDetails(null)
          toast.dismiss()
          toast.error(error?.res?.data?.message)
      }        
  }

    // fetch classrooms
    useEffect(()=>{
      const fetchClassrooms=async () => {
          try {
              toast.info('Loading classrooms')
              const res = await axios.get('https://schoolapi-92n6.onrender.com/api/classroom',authHeader)
              toast.dismiss()
              setClassrooms(res.data)
          } catch (error) {
              toast.dismiss()
              toast.error('Failed to fetch classrooms')
          }            
      }
      fetchClassrooms()
  },[])
    // handle submit
    const handleSubmit=async (e) => {
        e.preventDefault()
        try {
            toast.info("Updating...")
            const data= new FormData()
            data.append('name',name)
            data.append('dateOfBirth',dateOfBirth)
            data.append('gender',gender)
            data.append('admissionNumber',admissionNumber)
            data.append('parentNationalId',parentNationalId)
            data.append('classroomId',classroomId)
            if (photo) data.append('photo',photo)

            const res= await axios.put(`https://schoolapi-92n6.onrender.com/api/student/${selectedStudent._id}`,
            data,
            {
              headers: {Authorization:`Bearer ${token}`},
              'Content-Type':'multipart/form-data'
            },
            )
            toast.dismiss()
            toast.success(res.data?.message || 'Student Updated Successfully')
            navigate('/admin-dashboard/students')
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
                    <li className='breadcrumb-item fw-bold'><Link to='/admin-dashboard/students'>Students </Link></li>
                    <li className='breadcrumb-item- active' aria-label='page'> / Update Student</li>
                </ol>
            </nav>
            
            <div className="card p-4 shadow-sm mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className='text-success '> 
                        <i className='bi bi-person-badge-fill me-2'></i> Update  Student
                    </h5>
    
                    <Link className='btn btn-success' to={'/admin-dashboard/students'}>
                    <i className='bi bi-arrow-left-circle-fill me-2'></i>Back
                    
                    </Link>
                </div>
    
                {/* form to post the teacher */}
                <form onSubmit={handleSubmit} >
                    <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <input type="text" className='form-control' placeholder='Name of the Student' value={name}  onChange={(e)=>setName(e.target.value)} required/>
                        </div>
    
    
                        <div className='col-md-6 mb-3'>
                            <input type="date" className='form-control' placeholder='Date of Birth' value={dateOfBirth}  onChange={(e)=>setdateOfBirth(e.target.value)} required/>
                        </div>
    
                        <div className='col-md-6 mb-3'>
                            <input type="number" className='form-control' placeholder='Admission Number' value={admissionNumber}  onChange={(e)=>setAdmissionNumber(e.target.value)} required/>
                        </div>
    
                        <div className='col-md-6 mb-3'>
                            <select
                            className='form-control'
                            value={gender}
                            onChange={(e)=>setGender(e.target.value)}
                            required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        {/* classrooms */}
                        <div className='col-md-6 mb-3'>
                            <select
                            className='form-control'
                            value={classroomId}
                            onChange={(e)=>setClassroomId(e.target.value)}
                            required
                            >
                                <option value="">Select Classroom</option>
                                {classrooms.map((cls)=>(
                                    <option key={cls._id} value={cls._id}>{`${cls.gradeLevel},${cls.name}`}</option>
                                ))}
                            </select>
                        </div>
    
                        {/* Parent id */}
                        <div className='col-md-6 mb-3'>
                            <input type="number" 
                            className='form-control pe-5'
                            placeholder='Parent National ID' 
                            value={parentNationalId}  
                            onChange={(e)=>setParentNationalId(e.target.value)} 
                            required/>
                            <i className='bi bi-check-circle-fill'
                            onClick={verifyParent}
                            style={{
                                position:'absolute',
                                right:'15px',
                                top:'50%',
                                transform:'translateY(-50%)',
                                color:'green',
                                cursor:'pointer',
                                fontSize:'1.2rem',
                                pointerEvents:'auto'
                            }}
                            title='Verify Parent'
                            ></i>
                        </div>
    
                        {/* profile image */}
                        <div className="col-md-6 mb-3">
                            <input type="file" className='form-control' accept='image/*'
                            onChange={(e)=>setPhoto(e.target.files[0])} />
                        </div>
    
                    </div>
                    <button type='submit' className='btn btn-success'>
                        <i className='bi bi-save me-2'></i>Save Student
                    </button>
                </form>
    
            </div>
    
        </div>
  )
}

export default StudentEdit