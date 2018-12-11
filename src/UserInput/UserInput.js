import React from 'react';
import PropTypes from 'prop-types';

import './UserInput.css';

const UserInput = props => {
  const { change, defaultValue } = props;

  return <input className="UserInput" type="text" value={defaultValue} onChange={change} />;
};

UserInput.propTypes = {
  change: PropTypes.func,
  defaultValue: PropTypes.string
};

export default UserInput;
