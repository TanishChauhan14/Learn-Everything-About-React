Redux :- It is a state management library.Keeps your application's state in a single central store so components can share and update data in a predictable way

React-Redux :- It is kind of thing/stuff we use to connect Redux with React means official React binding for Redux.Lets your React components connect to the Redux store.

Readux-toolkit :- The official, recommended way to write Redux code. Solves Redux’s boilerplate problem by giving you prebuilt tools.

Store = wahi central jagah jaha pure app ka sara data (state) rakha hota hai.

Reducer = ek function hota hai jo decide karta hai ki store ka data (state) kaise change hoga jab koi action aata hai.

useSelector = jab koi value select krni hai store m se 

useDispatcher = jab koi value bhejni hai store m se 

STEPS :- 

a . Create store using import configurestore pass object and reducer in it .

b.  To create reducer create another file called Slice 

c.  First Create a slice :- import createSlice and nanoid for id 

Three things to create Slice 

1. name : 'for instance :- todo'
2. initialState  = const initialState = todos : [{ example :- id : 1 , text : 'Hello'}]
3. reducers : { key function like : addtodo(state,action) =>{// Code }}

state(prev) :- Updated state value last updated Array object .isse hame spread ka use nhi krna pdta kyuki state preserve rhti hai 

action : payload that contains data.


d. export the reducers using the todoaSlice.actions because to use individual functionality.

e. export default todo.reducer because we want it for our store .

f.  Now use these key funtions using usedispatch(keyfunction(input/data))

g. Or to get/select the data from store useSlector(state => state.todos) it return whole todos list or anything present in state like ,Login data ,Jwt tokken etc.

h. Map the array.

i. Wrap the app with Provider and pass store={store}