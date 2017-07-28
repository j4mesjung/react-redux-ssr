// ./src/components/App.js
import React from 'react';

const App = (props) => (
  <div>
    <h2>Hello, James</h2>
    {props.children}
  </div>
);

export default App;
