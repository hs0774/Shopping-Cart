import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Cart from './components/Cart';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import './index.css';

interface Item {
  image: string,
  id: number,
  price: number,
  title: string,
  inCart:boolean,
  quantity:number,
  cost:number,
  rating: {
      rate:number
  },
}

function App() {
  const [data, setData] = React.useState<Item[]>([]);
  return (
    <BrowserRouter>
    <Routes>
     <Route
       path="/"
       element={<Navbar data={data} setData={setData} />}
      >
      <Route
      index
      element={<Homepage data={data} setData={setData} />}
      />
      <Route path="Cart" element={<Cart data={data} setData={setData} />} />
      <Route path="About" element={<About />} />
      <Route path="Shop" element={<Shop data={data} setData={setData} />} />
     </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

