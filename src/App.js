import React, { useReducer } from "react";
import { BrowserRouter, Route } from "react-router-dom";



import Home from "./pages/firstpage";
import combineReducers from "./reducer";




const App = () => {
  const [state, dispatch] = useReducer(combineReducers, {});

  return (
    <BrowserRouter>
      <div style={{ height: "100%", width: "100%" }}>
        <main>
          <Route path="/" component={Home} exact />
        
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
