import React from "react";
import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <section>
      <h2> Payment canceled </h2>
      <Link to="/"> back </Link>
    </section>
  );
};

export default CancelPage;
