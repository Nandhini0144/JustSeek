import React from 'react';
import intro from '../intro.png';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="text-container">
        <h1 className="main-heading">
          To Choose Right Jobs.{" "}
          <span className="highlight"> JustSeek is for You</span>{" "}
        </h1>
        <p className="subtext" >
        "JustSeek is your ultimate job search platform, connecting you with thousands of job opportunities daily. Discover your dream job effortlessly with our user-friendly interface and powerful search tools."
        </p>
      </div>
      <div className="image-container">
        <img src={intro} alt="Product" className="image" />
      </div>
    </div>
  );
};

export default HomePage;
