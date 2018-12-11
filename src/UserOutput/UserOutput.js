import React from 'react';
import PropTypes from 'prop-types';

const UserOutput = props => {
  const { username, copy } = props;

  return (
    <div onCopy={copy}>
      <p>{username}</p>
      <p />
    </div>
  );
};

UserOutput.propTypes = {
  username: PropTypes.string,
  copy: PropTypes.func
};

export default UserOutput;
