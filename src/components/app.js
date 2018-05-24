import React, {Component} from "react";
import Header from "./header";
import Map from "./map";
import List from "./list";


class App extends Component{

  render(){
  return (
    <div>
      <Header />
      <Map />
      <List />
    </div>
    )
  }
};

export default App;
