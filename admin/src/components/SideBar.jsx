import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';
import { DoctorContext } from '../context/DoctorContext';

const SideBar = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-white border-r sm:w-64 md:w-72">
      {atoken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r border-primary' : ''
              }`
            }
            to="/admin-dashboard"
          >
            <img
              className={({ isActive }) =>
                `block ${isActive ? 'w-8 h-8' : 'w-6 h-6'}`
              }
              src={assets.home_icon}
              alt=""
            />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r border-primary' : ''
              }`
            }
            to="/all-appointments"
          >
            <img
              className={({ isActive }) =>
                `block ${isActive ? 'w-8 h-8' : 'w-6 h-6'}`
              }
              src={assets.appointment_icon}
              alt=""
            />
            <p className="hidden md:block">Appointment</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r border-primary' : ''
              }`
            }
            to="/add-doctor"
          >
            <img
              className={({ isActive }) =>
                `block ${isActive ? 'w-8 h-8' : 'w-6 h-6'}`
              }
              src={assets.add_icon}
              alt=""
            />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r border-primary' : ''
              }`
            }
            to="/doctor-list"
          >
            <img
              className={({ isActive }) =>
                `block ${isActive ? 'w-8 h-8' : 'w-6 h-6'}`
              }
              src={assets.people_icon}
              alt=""
            />
            <p className="hidden md:block">Doctor List</p>
          </NavLink>
        </ul>
      )}
      {dtoken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r border-primary' : ''
              }`
            }
            to="/doctor-dashboard"
          >
            <img
              className={({ isActive }) =>
                `block ${isActive ? 'w-8 h-8' : 'w-6 h-6'}`
              }
              src={assets.home_icon}
              alt=""
            />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r border-primary' : ''
              }`
            }
            to="/doctor-appointments"
          >
            <img
              className={({ isActive }) =>
                `block ${isActive ? 'w-8 h-8' : 'w-6 h-6'}`
              }
              src={assets.appointment_icon}
              alt=""
            />
            <p className="hidden md:block">Appointment</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r border-primary' : ''
              }`
            }
            to="/doctor-profile"
          >
            <img
              className={({ isActive }) =>
                `block ${isActive ? 'w-8 h-8' : 'w-6 h-6'}`
              }
              src={assets.people_icon}
              alt=""
            />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default SideBar;
