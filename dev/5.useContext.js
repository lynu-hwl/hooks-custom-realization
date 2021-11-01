import React from 'react';
import ReactDOM from 'react-dom';

const Context = React.createContext();

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
 * 
 * @description 
 * useContext 就是把相应context._currentValue返回出去，react会把Context.Provider传递的value赋给context._currentValue，
 * 这样Context包裹的任意子组件都可以通过useContext拿到Context.Provider传递的value
 */
function useContext(context){
  console.log(context,'context');
  console.log(context._currentValue,'context._currentValue');
  return context._currentValue
}

function Chilren(){
  const {value,setValue} = useContext(Context);
  return(
    <div>
      <h1>{value}</h1>
      <button onClick={()=>setValue(value-1)}>-</button>
      <button onClick={()=>setValue(value+1)}>+</button>
    </div>
  )
}

function Index(){
  const [value,setValue] = useState(0);

  return(
    <Context.Provider value={{value,setValue}}>
      <h1>{value}</h1>
      <button onClick={()=>setValue(value-1)}>-</button>
      <button onClick={()=>setValue(value+1)}>+</button>
      <Chilren/>
    </Context.Provider>
  )
}

function render(){
  ReactDOM.render(
    <Index/>,
    document.getElementById("root")
  )
}

render();
