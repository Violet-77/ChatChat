import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
}

export default App;
