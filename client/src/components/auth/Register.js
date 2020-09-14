import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  //Default state values: initial state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  //Destructuring, grabbing values and setting it into these vars.
  const { name, email, password, confirmPassword } = formData;

  //Called whenever an input is updated.
  const onChange = (x) => {
    setFormData({
      ...formData,
      [x.target.name]: x.target.value,
    });
  };

  //Called when the form is submitted.
  const onSubmit = async (x) => {
    //Prevent browser reload.
    x.preventDefault();

    if (password !== confirmPassword) {
      console.log('Passwords do not match.');
    } else {
      console.log(formData);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Register</h1>
      <p className='lead'>
        <i className='fa fa-user'></i> Create a new account on Flexer.
      </p>

      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            autoComplete='off'
            placeholder='Full Name'
            name='name'
            value={name}
            onChange={(x) => onChange(x)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            autoComplete='off'
            name='email'
            value={email}
            onChange={(x) => onChange(x)}
            placeholder='Email Address'
            required
          />
          <small className='form-text'>
            If you want a profile image, register your email address with
            Gravatar.
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            autoComplete='off'
            name='password'
            value={password}
            onChange={(x) => onChange(x)}
            placeholder='Password'
            minLength='8'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            autoComplete='off'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(x) => onChange(x)}
            placeholder='Confirm Password'
            minLength='8'
            required
          />
        </div>
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
