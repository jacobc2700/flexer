import React from 'react';

const NavigationBar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <a href='dashboard.html'>
          <i className='fa fa-code'></i> Flexer <i className='fa fa-code'></i>
        </a>
      </h1>
      <ul>
        <li>
          <a href='developers.html'>Developers</a>
        </li>
        <li>
          <a href='register.html'>Register</a>
        </li>
        <li>
          <a href='login.html'>Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
