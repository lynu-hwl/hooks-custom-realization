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

function useEffect(fn,dependencies){
  const currentIndex =  ++index;
  if(stack[currentIndex]){
    const [oldReFn,oldDependencies] = stack[currentIndex];
    const tag = dependencies.every((item,index)=>item===oldDependencies[index]);
    if(tag){
      stack[currentIndex] = [oldReFn,oldDependencies];
    }else{
      if(typeof oldReFn === 'function'){
        oldReFn()
      }
      const newReFn = fn();
      stack[currentIndex] = [newReFn,dependencies];
    }
  }else{
    const reFn = fn();
    stack[currentIndex] = [reFn,dependencies];
  }
}

function Chilren(){
  const [value1,setValue1] = useState(0);
  const [value2,setValue2] = useState(0);

  useEffect(()=>{
    console.log('useEffect');
    return ()=>console.log('销毁');
  },[])

  return(
    <div style={{border:'1px solid red'}}>
      <h1>{value1}</h1>
      <button onClick={()=>setValue1(value1-1)}>-</button>
      <button onClick={()=>setValue1(value1+1)}>+</button>
      <h1>{value2}</h1>
      <button onClick={()=>setValue2(value2-1)}>-</button>
      <button onClick={()=>setValue2(value2+1)}>+</button>
    </div>
  )
}

function Index(){
  const [value1,setValue1] = useState(0);

  return(
    <div>
      <h1>{value1}</h1>
      <button onClick={()=>setValue1(value1-1)}>-</button>
      <button onClick={()=>setValue1(value1+1)}>+</button>
     {value1 < 10 && <Chilren/>}
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



// import React from 'react';
// import ReactDOM from 'react-dom';

// let lastState = [];   
// let index = 0;
// function useState (initialState) {
//   lastState[index] = lastState[index] || initialState;
//   let currentIndex = index;
//   function setState (value) {
//     lastState[currentIndex] = value;
//     render();
//   }
//   return [lastState[index++], setState]
// }

// function useEffect (callback, deps) {
//   if (lastState[index]) {
//     const [lastDestroy, lastDeps] = lastState[index];
//     let same;
//     // debugger
//     if (deps instanceof Array) {
//       same = deps.every((item, index) => item === lastDeps[index])
//     } else {
//       same = false;
//     }

//     if (same) {
//       index++;
//     } else {
//       // debugger
//       if(typeof lastDestroy === 'function'){
//         lastDestroy() 
//       }
//       const destroy = callback();
//       lastState[index++] = [destroy, deps]
//     }
//   } else {
//     const destroy = callback();
//     lastState[index++] = [destroy, deps]
//   }
// }

// function Chilren(){
//   React.useEffect(()=>{
//     console.log('Chilren 进入');
//     return ()=> console.log('Chilren 销毁');
//   },[])
//   return <div>Chilren</div>
// }


// function Counter () {
//   let [count, setCount] = React.useState(0);

//   React.useEffect(() => {
//     console.log('Counter 进入');
//     return ()=>console.log('Counter  销毁');
//   })

//   return <div>
//     <span>{count}</span>
//     <button onClick={() => setCount(count + 1)}>+</button>
//     {count < 10 && <Chilren/>}
//   </div>
// }

// function render () {
//   index = 0;
//   ReactDOM.render(
//     <Counter />,
//     document.getElementById('root')
//   )
// }
// render();