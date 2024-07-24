import React from "react";
import Header from "../common/Header";

import Goals from "./component/goals/Goals";
import ExpirationBox from "./component/expirationBox/ExpirationBox";

function Hompage() {
  return (
    <div>
      <Header />
      <ExpirationBox />
      <Goals />
    </div>
  );
}

export default Hompage;
