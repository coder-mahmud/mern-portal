import React, { useState } from 'react'
import Logo from '../assets/logo.svg'
import UserIcon from '../assets/user.svg'
import { useRegisterMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import LeftBg from '../assets/login-left-bottom-bg.png'
import RightBg from '../assets/Login-right-top-bg.png'






const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  const [register,{isLoading, isError, error}] = useRegisterMutation()
  const navigate = useNavigate()

  const formHandler = async (e) => {
    e.preventDefault();
    const data = {
      firstName, lastName, company, phone, email
    }

    try {
      const apiData = await register(data).unwrap();
      // const apiData = await register(data);
      console.log(apiData.userInfo)
      toast.success("User created successfully. An admin will review you submission and you will be notified through email!")
      //navigate('/')
    } catch (error) {
      console.log(error)
      console.log(error.data.msg)
      toast.error(error.data.msg)
    }
    
  }


  return (
    <>
      <div className="max-w-[540px] rounded-xl   mx-auto my-[158px] bg-gradient-to-br from-[#ECECEC] to-[#494340] p-[1px] relative">
        <div className="bg-[#070707] backdrop-blur  rounded-xl p-10 relative z-20">
          <img src={Logo} alt="" className='mx-auto' />
          <form onSubmit={formHandler} action="" className='mt-4'>
            
            <div className="form-group flex flex-col md:flex-row gap-6 w-full mb-6">
              <div className="flex flex-col gap-3">
                <label htmlFor="firstName" className='text-white'>First Name</label>
                <input type="text" id="firstName" className='bg-[#1C1C1C] text-input text-white px-4 py-2 rounded-md' placeholder='First Name' required value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="lastName" className='text-white'>Last Name</label>
                <input type="text" id="lastName" className='bg-[#1C1C1C] text-input text-white px-4 py-2 rounded-md' placeholder='Last Name'required value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            <div className="form-group flex flex-col md:flex-row w-full mb-6">
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="companyName" className='text-white'>Company Name</label>
                <input type="text" id="companyName" className='bg-[#1C1C1C] text-input text-white px-4 py-2 rounded-md w-full' placeholder='Company Name' required value={company} onChange={(e) => setCompany(e.target.value)}/>
              </div>
            </div>

            <div className="form-group flex flex-col md:flex-row w-full mb-6">
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="email" className='text-white'>Email</label>
                <input type="email" id="email" className='bg-[#1C1C1C] text-input text-white px-4 py-2 rounded-md w-full' placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
            </div>

            <div className="form-group flex flex-col md:flex-row w-full mb-8">
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="phone" className='text-white'>Phone Number</label>
                <input type="text" id="phone" className='bg-[#1C1C1C] text-input text-white px-4 py-2 rounded-md w-full' placeholder='Phone Number' required value={phone} onChange={(e) => setPhone(e.target.value)}/>
              </div>
            </div>

            <div className="form-group flex flex-col md:flex-row w-full mb-6">
              <input type="submit" className='text-white bg-primary-blue font-semibold text-base leading-6 py-3 text-center w-full rounded-3xl border border-primary-blue cursor-pointer' value="Request An Access" />
            </div>


          </form>

          <Link to="/login/" className="flex flex-col gap-4 justify-center items-center">
            <img className='w-8 h-8' src={UserIcon} alt="" />
            <p className="font-mediul">Login to your Account</p>
          </Link>


        </div>

        <img src={LeftBg} className='absolute w-[600px] left-[-20%] bottom-[-20%] z-10' alt="" />
        <img src={RightBg} className='absolute w-[800px] right-[-20%] top-[-20%] z-10' alt="" />


      </div>
    </>
  )
}

export default Register