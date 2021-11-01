import React from 'react';
import ReactDOM from 'react-dom';

/**
 * react的刷新方式有三种，两种自动调用（state、props改变），一种手动调用（this.forceUpdate()）
 * hooks中每一次render都会使的render涉及的部分从根部开始更新，会出现传递给子组件的props数据在父组件或之上的组件重新创建，而props更新了就会使的子组件重新渲染，但大多数的情况下props还是原值
 * 同时还应注意到shouldComponentUpdate 默认返回true，就使的render时会默认引起自组件的重新渲染，可使用React.memo(函数组件) React.PureComponent(类组件)的props浅比较功能达到props一级数据
 * 不变就不重新渲染
 */

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

function useMemo(fn,dependencies){
  const currentIndex =  ++index;
  if(stack[currentIndex]){
    const [oldData,oldDependencies] = stack[currentIndex];
    const tag = dependencies.every((item,index)=>item===oldDependencies[index]);
    if(tag){
      return oldData;
    }else{
      stack[currentIndex] = [fn(),dependencies];
      return stack[currentIndex][0];
    }
  }else{
    stack[currentIndex] = [fn(),dependencies];
    return stack[currentIndex][0];
  }
}

function useCallback(fn,dependencies){
  const currentIndex =  ++index;
  if(stack[currentIndex]){
    const [oldFn,oldDependencies] = stack[currentIndex];
    const tag = dependencies.every((item,index)=>item===oldDependencies[index]);
    if(tag){
      return oldFn;
    }else{
      stack[currentIndex] = [fn,dependencies];
      return stack[currentIndex][0];
    }
  }else{
    stack[currentIndex] = [fn,dependencies];
    return stack[currentIndex][0];
  }
}

function Chilren({value,valueChange}){
  console.log('Chilren');
  return (
    <div>
      <h1>{value}</h1>
      <button onClick={valueChange}>CHANGE</button>
    </div>
  )
}

const NewChilren = React.memo(Chilren)

function Index(){
  const [value1,setValue1] = useState(0);
  const [value2,setValue2] = useState(0);
  const value = useMemo(()=>value1,[value1]) ;
  const valueChange = useCallback(()=>setValue1(value1+Math.random()),[value1]);
  return(
    <div>
      <h1>{value1}</h1>
      <button onClick={()=>setValue1(value1-1)}>-</button>
      <button onClick={()=>setValue1(value1+1)}>+</button>
      <h1>{value2}</h1>
      <button onClick={()=>setValue2(value2-1)}>-</button>
      <button onClick={()=>setValue2(value2+1)}>+</button>
      <NewChilren value={value} valueChange={valueChange}/>
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
