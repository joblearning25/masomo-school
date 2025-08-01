import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='text-light d-flex flex-columns p-3' 
    style={{width:'250px',
        background:'linear-gradient(135deg, rgb(12,79,46) rgb(54,66,159))'
    }}>
        <h4 className='text-center mb-4'>
            <i className='bi bi-speedometer2 me-3'>Admin Panel</i>
        </h4>
        <ul className='nav nav-pills flex-column mb-auto'>
            <li className='nav-item'>
                <NavLink 
                    to='/admin-dashboard' 
                    end 
                    className={({isActive})=> isActive? 'nav-link bg-success text-light fw-bold':'nav-link text-light'}>

                <i className='bi bi-grid me-2'>Dashboard</i>
                </NavLink>
            </li> 

            <li className='nav-item'>
                <NavLink 
                    to='/admin-dashboard' 
                    end 
                    className={({isActive})=> isActive? 'nav-link bg-success text-light fw-bold':'nav-link text-light'}>

                <i className='bi bi-person-lines-fill me-2'>Students</i>
                </NavLink>
            </li> 


        </ul>


    </div>
  )
}

export default SideBar