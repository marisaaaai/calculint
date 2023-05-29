import "./pantalla.css";
import React from "react";
import PropTypes from "prop-types";

function Pantalla({ valor }) {
  return <div className="pantalla">{valor}</div>;
}

Pantalla.propTypes = {
  valor: PropTypes.string.isRequired,
};

export default Pantalla;
