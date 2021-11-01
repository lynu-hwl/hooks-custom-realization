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

/**
 * @description 1.ref的更新是直接操作dom，不需要重新render 2.ref就是一个{current:xx}的对象，赋给元素后，react会把该元素的dom属性赋给current
 */
function useRef(initVal){
  return {current:initVal}
}


function Index(){
  const myRef = useRef()

  function changeRed(){
    myRef.current.style.backgroundColor = "red";
  }

  function changeYellow(){
    myRef.current.style.backgroundColor = "yellow";
  }

  return(
    <div>
      <div style={{width:"100px",height:"100px",backgroundColor:"black"}} ref={myRef}/>
      <button onClick={changeRed}>变红</button>
      <button onClick={changeYellow}>变黄</button>
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
