import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
  
      
      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to='/'>
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">MeetUp</div>
      </Link>

      <hr className="sidebar-divider my-0"/>

      
      <li className="nav-item">
        <a className="nav-link" href="index.html">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></a>
      </li>

      <hr className="sidebar-divider d-none d-md-block"/>
      
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

    </ul>
    
    )
}

export default Sidebar
