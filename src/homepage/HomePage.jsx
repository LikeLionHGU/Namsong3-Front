import React from "react";
import Header from "../common/Header";
import Goals from "./component/goals/Goals";
import ExpirationBox from "./component/expirationBox/ExpirationBox";
import Footer from "../common/Footer";

function Hompage() {
  return (
    <div>
      <Header />
      <ExpirationBox />
      <Goals />
      <Footer />
    </div>
  );
}

export default Hompage;
