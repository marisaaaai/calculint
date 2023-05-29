import React from "react";
import "./botones.css";
import PropTypes from "prop-types";

function Botones({ className, value, onClick }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {value}
    </button>
  );
}

Botones.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Botones.defaultProps = {
  className: "",
};

export default Botones;
