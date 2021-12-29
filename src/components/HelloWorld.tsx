import React from 'react'

const HelloWorld = ({ msg }: { msg: string }) => {
  const [count, setCount] = React.useState<number>(0)
  const increment = (val: number) => {
    setCount(val + 1)
  }
  return (
    <>
      <h1>{msg}</h1>
      <button onClick={() => increment(count)}>count is: {count}</button>
      <p>
        Edit <code>components/HelloWorld.tsx</code> to test hot module
        replacement.
      </p>
    </>
  )
}

export default HelloWorld
