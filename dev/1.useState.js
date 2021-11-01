import React from 'react';
import ReactDOM from 'react-dom';

let currentValue;

function useState(initVlaue){
  currentValue = currentValue || initVlaue;
  function setCurrentValue(value){
    currentValue = value;
    render()
  }
  return [currentValue,setCurrentValue];
}

function Index(){
  const [value,setValue] = useState(0);
  return(
    <div>
      <h1>{value}</h1>
      <button onClick={()=>setValue(value-1)}>-</button>
      <button onClick={()=>setValue(value+1)}>+</button>
    </div>
  )
}

function render(){
  ReactDOM.render(
    <Index/>,
    document.getElementById("root")
  )
}

render();
