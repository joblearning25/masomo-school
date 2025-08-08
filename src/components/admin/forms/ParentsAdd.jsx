import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ParentsAdd = () => {
    const {token}=useContext(AuthContext)
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [nationalId,setNationalId]=useState('')
    const [address,setAddress]=useState('')

    // we prapare our authheader
    const authHeader={
        headers: {Authorization:`Bearer ${token}`}
    }

    // handle submit
    const handleSubmit=async (e) => {
        e.preventDefault()
        try {
            toast.info("Submitting...")
            const data={name,email,phone,nationalId,address}
            const res= await axios.post('https://schoolapi-92n6.onrender.com/api/parent',data,authHeader)
            toast.dismiss()
            toast.success(res.data?.message || 'Parent added Successfully')
            setName('')
            setEmail('')
            setPhone('')
            setAddress('')
            setNationalId('')
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
                <li className='breadcrumb-item fw-bold'><Link to='/admin-dashboard/parents'>Parents </Link></li>
                <li className='breadcrumb-item- active' aria-label='page'> / Add Parent</li>
            </ol>
        </nav>
        
        <div className="card p-4 shadow-sm mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className='text-success '> 
                    <i className='bi bi-person-badge-fill me-2'></i> Add New Parent
                </h5>

                <Link className='btn btn-success' to={'/admin-dashboard/parents'}>
                <i className='bi bi-arrow-left-circle-fill me-2'></i>Back
                
                </Link>
            </div>

            {/* form to post the teacher */}
            <form onSubmit={handleSubmit} >
                <div className='row'>
                    <div className='col-md-6 mb-3'>
                        <input type="text" className='form-control' placeholder='Name of the parent' value={name}  onChange={(e)=>setName(e.target.value)} required/>
                    </div>


                    <div className='col-md-6 mb-3'>
                        <input type="text" className='form-control' placeholder='Email address' value={email}  onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>

                    <div className='col-md-6 mb-3'>
                        <input type="number" className='form-control' placeholder='Phone' value={phone}  onChange={(e)=>setPhone(e.target.value)} required/>
                    </div>

                    <div className='col-md-6 mb-3'>
                        <input type="text" className='form-control' placeholder='Home Address' value={address}  onChange={(e)=>setAddress(e.target.value)} required/>
                    </div>

                    <div className='col-md-6 mb-3'>
                        <input type="number" className='form-control' placeholder='National Id' value={nationalId}  onChange={(e)=>setNationalId(e.target.value)} required/>
                    </div>

                </div>
                <button type='submit' className='btn btn-success'>
                    <i className='bi bi-save me-2'></i>Save Parent
                </button>
            </form>

        </div>

    </div>
  )
}

export default ParentsAdd