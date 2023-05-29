import React from 'react';
import PropTypes from 'proptypes';

const NavButton = ({ disabled, title, className, onClick }) => {
  if (disabled) {
    return (
      <span
        className={`${className} disabled`}
        title={title}
      >
        {title}
      </span>
    );
  }

  return (
    <a
      href="#"
      onClick={onClick}
      className={className}
      title={title}
    >
      {title}
    </a>
  );
};

NavButton.propTypes = {
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

NavButton.defaultProps = {
  disabled: false,
};

export default NavButton;
