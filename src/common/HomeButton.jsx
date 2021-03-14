import React from 'react';
import { Link } from 'react-router-dom';

const HomeButton = () => (
  <div className="HomeButton">
    <Link to="/">
      <input type="button" value="처음으로" />
    </Link>
  </div>
);

export default HomeButton;
