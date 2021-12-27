import React from "react";
import { render } from "react-dom";
import { StartComponent } from "__shared__"


const App = (props) => {
  return (
    <div>
      <h1>Project 1</h1>
      <StartComponent />
    </div>
  );
}


render(<App>
</App>, document.getElementById("app"));
