import Cards from "./components/Cards"

const App = () => {

  let obj1 = {
    id : 1,
    name :"steve",
    price:120
  }

  let obj2 = {
    id : 2,
    name :"harminy",
    price:1200
  }

  return (
    <div>
      <h1 className=' text-amber-600'>hello</h1>
      <Cards obj={obj1} />
      <Cards obj={obj2} />
    </div>
  )
}

export default App
