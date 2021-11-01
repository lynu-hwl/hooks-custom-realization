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

function useReducer(fn,initNum){
  const currentIndex =  ++index;
  stack[currentIndex] = stack[currentIndex] | initNum;
  function dispatch(action){
    // debugger
    stack[currentIndex] = fn(stack[currentIndex],action)
    render()
    index = -1;
  }
  return [stack[currentIndex],dispatch]
}

function reducer(state,action){
  switch(action.type){
    case 'ADD':
      return state+1;
    case 'REDUCE':
      return state-1;
    default:
      return state;
  }
}

function Index(){
  const [value,setValue] = useState(0);
  const [num,dispatch] = useReducer(reducer,0)

  return(
    <div>
      <h1>{value}</h1>
      <button onClick={()=>setValue(value-1)}>-</button>
      <button onClick={()=>setValue(value+1)}>+</button>
      <h1>{num}</h1>
      <button onClick={()=>dispatch({type:'REDUCE'})}>-</button>
      <button onClick={()=>dispatch({type:'ADD'})}>+</button>
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
