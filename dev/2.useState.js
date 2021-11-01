import React from 'react';
import ReactDOM from 'react-dom';

let stack = [];
let index = -1;

function useState(initVlaue){
  const currentIndex =  ++index;
  stack[currentIndex] = stack[currentIndex] || initVlaue;
  function setCurrentValue(value){
    stack[currentIndex] = value;
    render()
    index = -1;
  }
  return [stack[currentIndex],setCurrentValue];
}

function Index(){
  const [value1,setValue1] = useState(0);
  const [value2,setValue2] = useState(0);
  return(
    <div>
      <h1>{value1}</h1>
      <button onClick={()=>setValue1(value1-1)}>-</button>
      <button onClick={()=>setValue1(value1+1)}>+</button>
      <h1>{value2}</h1>
      <button onClick={()=>setValue2(value2-1)}>-</button>
      <button onClick={()=>setValue2(value2+1)}>+</button>
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
