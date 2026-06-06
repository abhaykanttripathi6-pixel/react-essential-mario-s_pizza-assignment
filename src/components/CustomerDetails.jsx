import React, { useEffect, useState } from 'react';

const CustomerDetails = ({ stepper, setStepper, setStep, setCustomerDetails, customerDetails, isEdit }) => {

  const [info, setInfo] = useState({
    customerName: isEdit? customerDetails.customerName:'',
    phoneNumber:  isEdit? customerDetails.phoneNumber:'',
    email:  isEdit? customerDetails.email:'',
    password:  isEdit? customerDetails.password:'',
    confirmPass:  isEdit? customerDetails.confirmPass:'',
    deliveryAddress:  isEdit? customerDetails.deliveryAddress:'',
    gender:  isEdit? customerDetails.gender:'Male',
    termsNconditions:  isEdit? customerDetails.termsNconditions:false,
  })

  const [errors, setErrors] = useState({
    nameErr: '',
    phoneNumberErr: '',
    emailErr: '',
    passwordErr: '',
    confirmPassErr: '',
    deliveryAddressErr: '',
    termsNconditionsErr: ''
  })


  const btnStatus = info.customerName && info.phoneNumber && info.email && info.email && info.password && info.confirmPass && info.deliveryAddress && info.gender && info.termsNconditions ? false : true;
  console.log(btnStatus);



  const validation = (name, value) => {
    // customerName Validation
    if (name === 'customerName') {
      if (!value.trim()) {
        return setErrors(prev => ({ ...prev, nameErr: 'name is required' }))
      } else if (value.length > 50) {
        return setErrors(prev => ({ ...prev, nameErr: 'only 50 characters are allowed' }))
      } else {
        return setErrors(prev => ({ ...prev, nameErr: '' }))
      }
    }

    //phoneNumber validation
    if (name === 'phoneNumber') {
      if (!value.trim()) {
        return setErrors(prev => ({ ...prev, phoneNumberErr: 'Phone number is required' }))
      } else if (value.length < 10) {
        return setErrors(prev => ({ ...prev, phoneNumberErr: 'Please enter a valid phone number' }))
      } else {
        return setErrors(prev => ({ ...prev, phoneNumberErr: '' }))
      }
    }

    //Email validation
    if (name === 'email') {
      if (!value.trim()) {
        return setErrors(prev => ({ ...prev, emailErr: 'Email address is required' }))
      } else if (!value.includes('@gmail.com')) {
        return setErrors(prev => ({ ...prev, emailErr: 'Please enter a valid email address' }))
      } else {
        return setErrors(prev => ({ ...prev, emailErr: '' }))
      }
    }

    //Password validation
    if (name === 'password') {
      if (!value.trim()) {
        return setErrors(prev => ({ ...prev, passwordErr: 'Password is required' }))
      } else if (!(/\d/.test(value))) {
        return setErrors(prev => ({ ...prev, passwordErr: 'atleast one numeric value is required' }))
      } else if (!(/[a-z]/.test(value))) {
        return setErrors(prev => ({ ...prev, passwordErr: 'atleast one lowercase character is required' }))
      } else if (!(/[A-Z]/.test(value))) {
        return setErrors(prev => ({ ...prev, passwordErr: 'atleast one uppercase character is required' }))
      } else if (!(/[!@#$%^&*₹`~?]/.test(value))) {
        return setErrors(prev => ({ ...prev, passwordErr: 'atleast one special character is required' }))
      } else if (value.length <= 8) {
        return setErrors(prev => ({ ...prev, passwordErr: 'password should be of atleast 8 digits' }))
      } else if (value.length >= 50) {
        return setErrors(prev => ({ ...prev, passwordErr: 'password should be less than 50 digits' }))
      } else {
        return setErrors(prev => ({ ...prev, passwordErr: '' }))
      }
    }

    if (name === 'confirmPass') {
      if (!value.trim()) {
        return setErrors(prev => ({ ...prev, confirmPassErr: 'please confirm your password' }))
      } else if (value !== info.password) {
        return setErrors(prev => ({ ...prev, confirmPassErr: 'your password is not matching' }))
      } else {
        return setErrors(prev => ({ ...prev, confirmPassErr: '' }))
      }
    }

    // Delivery address validation
    if (name === 'deliveryAddress') {
      if (!value.trim()) {
        return setErrors(prev => ({ ...prev, deliveryAddressErr: 'please enter your delivery address' }))
      } else {
        return setErrors(prev => ({ ...prev, deliveryAddressErr: '' }))
      }
    }

    // terms&condition validation
    if (name === 'termsNconditions') {
      if (!value) {
        return setErrors(prev => ({ ...prev, termsNconditionsErr: 'You must accept terms & conditions' }))
      } else {
        return setErrors(prev => ({ ...prev, termsNconditionsErr: '' }))
      }
    }

  }

  const handleInputChange = (name, value) => {

    if (Object.keys(info).includes(name)) {
      setInfo(prev => ({ ...prev, [name]: value }))
    }
    validation(name, value);
  }


  const handleSubmit = (e) => {
    e.preventDefault(e)
    setCustomerDetails(info);
    setStep(2);
  };


  return (
    <div className='w-full p-3 bg-yellow-300 rounded-md shadow-[1px_1px_5px_3px_rgba(0,0,0,0.18)] sm:w-150 sm:p-5'>
      <h2 className='text-center text-lg font-semibold '>Create Your Account</h2>

      <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-3'>

        <div className=' flex flex-col gap-1'>
          <label htmlFor="customer-name">Full Name</label>
          <input id='customer-name' name='customerName' type="text" placeholder='Enter Your Full Name' maxLength={51} value={info.customerName.slice(0, 50)} onChange={(e) => handleInputChange(e.target.name, e.target.value)} className='px-2 py-1.5 bg-yellow-50 border outline-yellow-600 rounded-md' />
          {errors.nameErr && <span className='text-xs font-semibold text-red-600'>{errors.nameErr}</span>}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="customer-phoneNumber">Phone Number</label>
          <input id='customer-phoneNumber' name='phoneNumber' type="tel" placeholder='(555) 123-4567' maxLength={10} value={info.phoneNumber} onChange={(e) => handleInputChange(e.target.name, e.target.value)} className='px-2 py-1.5 bg-yellow-50 border outline-yellow-600 rounded-md' />
          {errors.phoneNumberErr && <span className='text-xs font-semibold text-red-600'>{errors.phoneNumberErr}</span>}
        </div>

        <div className=' flex flex-col gap-1'>
          <label htmlFor="customer-email">Email Address</label>
          <input id='customer-email' name='email' type="email" placeholder='xyz@gmail.com' className='px-2 py-1.5 bg-yellow-50 border outline-yellow-600 rounded-md' value={info.email} onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
          {errors.emailErr && <span className='text-xs font-semibold text-red-600'>{errors.emailErr}</span>}
        </div>

        <div className=' flex flex-col gap-1'>
          <label htmlFor="password">Password</label>
          <input id='password' name='password' type="password" placeholder='••••••••' maxLength={51} className='px-2 py-1.5 bg-yellow-50 border outline-yellow-600 rounded-md' value={info.password.slice(0, 50)} onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
          {errors.passwordErr && <span className='text-xs font-semibold text-red-600'>{errors.passwordErr}</span>}
        </div>

        <div className=' flex flex-col gap-1'>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input id='confirm-password' name='confirmPass' type="password" placeholder='••••••••' className='px-2 py-1.5 bg-yellow-50 border outline-yellow-600 rounded-md' value={info.confirmPass} onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
          {errors.confirmPassErr && <span className='text-xs font-semibold text-red-600'>{errors.confirmPassErr}</span>}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="delivery-address">Delivery Address</label>
          <textarea id='delivery-address' name='deliveryAddress' placeholder='123 Main St, Brooklyn, NY1001' rows={3} maxLength={100} className='px-2 py-1.5 bg-yellow-50 border outline-yellow-600 rounded-md resize-none break-all' value={info.deliveryAddress} onChange={(e) => handleInputChange(e.target.name, e.target.value)} />

          <div className={`flex ${errors.deliveryAddressErr ? `justify-between` : 'justify-end'}`}>
            {errors.deliveryAddressErr && <span className=' text-xs font-semibold text-red-600'>{errors.deliveryAddressErr}</span>
            }
            <span className='text-xs self-end'>{info.deliveryAddress.length}/100</span>
          </div>
        </div>

        <div>
          <label>Gender</label>
          <div className='grid grid-cols-3 gap-3' name='gender' onClick={(e) => handleInputChange('gender', e.target.textContent)}>
            <span className={`p-1 border bg-yellow-50 text-center rounded-sm ${info.gender.trim() === 'Male' ? 'border-2 border-red-600 text-red-600 font-semibold' : ''}`}> Male </span>
            <span className={`p-1 border bg-yellow-50 text-center rounded-sm ${info.gender.trim() === 'Female' ? 'border-2 border-red-600 text-red-600 font-semibold' : ''}`}> Female </span>
            <span className={`p-1 border bg-yellow-50 text-center rounded-sm ${info.gender.trim() === 'Other' ? 'border-2 border-red-600 text-red-600 font-semibold' : ''}`}> Other </span>
          </div>
        </div>

        <div>
          <div className='flex items-center gap-3 text-sm'>
            <input id='terms&conditions' name='termsNconditions' type="checkbox" required className='size-4' checked={info.termsNconditions} onChange={(e)=>handleInputChange(e.target.name, e.target.checked)} />
            <label htmlFor="terms&conditions" className='text-xs sm:text-sm'>I agree to Mario's <span className='font-bold'>Terms&Conditions</span> and <span className='font-bold'>Privacy Policy</span></label>
          </div>
          {errors.termsNconditionsErr && <span className='text-xs font-semibold text-red-600'>{errors.termsNconditionsErr}</span>}
        </div>

        <button type='submit' disabled={btnStatus} className={`w-full p-1.5 my-1 bg-orange-600 text-white font-semibold outline-none rounded-md cursor-pointer ${btnStatus ? 'bg-red-400' : ''}`} >{isEdit?'Update':'Submit'}</button>

      </form>
    </div>
  )
}

export default CustomerDetails;
