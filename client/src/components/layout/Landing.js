import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
