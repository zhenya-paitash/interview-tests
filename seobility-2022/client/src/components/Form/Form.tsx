import React, { useEffect, useState } from 'react'
import { useInput } from '../../hooks/formHooks'
import { DataRequest, DataResponse } from '../../types/formTypes'

import Loading from '../Loading/Loading'
import Error from '../Error/Error'

import axios from 'axios'
import './Form.sass'

const Form: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [serverResponse, setServerResponse] = useState<DataResponse>({
    status: 'pending',
    message: '',
  })

  const [showStatus, setShowStatus] = useState<boolean>(false)

  const username = useInput('', { isEmpty: true, isUsername: true })
  const email = useInput('', { isEmpty: true, isEmail: true })
  const phone = useInput('+7 (', { isEmpty: true, isPhone: true })
  const birthday = useInput('', { isEmpty: true, isAdult: true })
  const message = useInput('', { isEmpty: true, minLength: 10, maxLength: 300 })

  useEffect(() => {
    setIsDisabled([
      username.errors,
      email.errors,
      phone.errors,
      birthday.errors,
      message.errors
    ].some(errArray => errArray.length))
  }, [username.errors, email.errors, phone.errors, birthday.errors, message.errors])
  
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isDisabled) return

    setLoading(true)
    try {
      const formData: DataRequest = {
        username: username.value,
        email: email.value,
        phone: phone.value,
        birthday: birthday.value,
        message: message.value,
      }
      const { data } = await axios.post('http://localhost:5000/api/feedback', formData)
      console.log(data)
      setServerResponse(data)
      
      username.clear('')
      email.clear('')
      phone.clear('+7 (')
      birthday.clear('')
      message.clear('')
    } catch (err: any | unknown) {
      console.log(err)
      setServerResponse(err.response?.data?.message || err.message || err)
    }

    setLoading(false)
    setShowStatus(true)
    setTimeout(() => setShowStatus(false), 5000)
  }

  return loading ? (
    <Loading />
  ) : (
    <form className="form" autoComplete='off'>
      <h2>Feedback Form</h2>

      {/* TODO Вынести в отдельный компоненты */}

      <div 
        className={`form-field${username.touched && username.errors.length ? ' error' : ''}`}
      >
        <label htmlFor="username">Username</label>
        <input
          value={username.value}
          onChange={username.onChange}
          onBlur={username.onBlur}
          id='username'
          name='username'
          type="text" 
          placeholder='JOHN DOE'
          required
        />
        {username.touched && <Error errors={username.errors} />}
      </div>

      <div
        className={`form-field${email.touched && email.errors.length ? ' error' : ''}`}
      >
        <label htmlFor="email">Email</label>
        <input
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
          id='email'
          name='email'
          type="email" 
          placeholder='johndoe@example.com'
          formNoValidate
        />
        {email.touched && <Error errors={email.errors} />}
      </div>

      <div
        className={`form-field${phone.touched && phone.errors.length ? ' error' : ''}`}
      >
        <label htmlFor="phone">Phone</label>
        <input
          value={phone.value}
          onChange={phone.onChange}
          onBlur={phone.onBlur}
          onKeyDown={phone.onKeyDown}
          id='phone'
          name='phone'
          type="tel" 
        />
        {phone.touched && <Error errors={phone.errors} />}
      </div>

      <div
        className={`form-field${birthday.touched && birthday.errors.length ? ' error' : ''}`}
      >
        <label htmlFor="date">Birthday</label>
        <input
          value={birthday.value}
          onChange={birthday.onChange}
          onBlur={birthday.onBlur}
          id='birthday'
          name='birthday'
          type="date" 
          max={new Date().toISOString().split('T')[0]}
        />
        {birthday.touched && <Error errors={birthday.errors} />}
      </div>

      <div
        className={`form-field${message.touched && message.errors.length ? ' error' : ''}`}
      >
        <label htmlFor="message">Message</label>
        <textarea
          value={message.value}
          onChange={message.onChange}
          onBlur={message.onBlur}
          id='message'
          name='message'
          placeholder='Your feedback is very important to us.'
        />
        {message.touched && <Error errors={message.errors} />}
      </div>

      <button
        className="btn"
        type='submit'
        onClick={submitHandler}
        disabled={isDisabled}
      >Send</button>

      <div className="status">
        {/* TODO прикрутуть анимации */}
        {showStatus && <p>Status: {serverResponse.status || 'OOPS! Something went wrong.'}</p>}
      </div>
    </form>
  )
}

export default Form