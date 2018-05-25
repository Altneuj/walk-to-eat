import React, {Component} from "react";
import Header from "./header";
import Map from "./map";
import List from "./list";


class App extends Component{

  render(){
    return (
      <div className="container-fluid">
        <Header />
        <Map />
        <List />
        <p className='text-center'> Powered by Cloud based Block-Chain Techonology </p>
      </div>
    )
  }
};

export default App;
