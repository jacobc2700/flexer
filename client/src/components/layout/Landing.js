import React from 'react';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Flexer</h1>
          <p className='lead'>
            Create an online portfolio and flex your developer credentials.
          </p>
          <div className='buttons'>
            <a href='register.html' className='btn btn-primary'>
              Sign Up
            </a>
            <a href='login.html' className='btn'>
              Sign In
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
