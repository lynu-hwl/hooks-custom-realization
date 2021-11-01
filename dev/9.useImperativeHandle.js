
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

function useRef(initVal){
  return {current:initVal}
}

function Chilren({props,ref}){
  const myRef = useRef();
  ref.current = {
    setRed:()=> myRef.current.style.backgroundColor = 'red',
    setYellow:()=> myRef.current.style.backgroundColor = 'yellow',
  }

  return(
    <div style={{width:"100px",height:"100px",backgroundColor:'black'}} ref={myRef}/>
  )
}

const NewChilren = React.forwardRef(Chilren)

function Index(){
  const myRef = useRef();

  return(
    <div>
      <NewChilren ref={myRef}/>
      <button onClick={myRef.current.setRed}>红色</button>
      <button onClick={myRef.current.setYellow}>黄色</button>
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
