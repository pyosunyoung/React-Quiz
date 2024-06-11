import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz1 from './Quiz1/Quiz1';
import Quiz2 from './Quiz2/Quiz2';
import Quiz3 from './Quiz3/Quiz3';
import Header from './Header';
import Main from './Main';
const Show = () => {
  return(
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
      <Route path='/' element={<Main/>}/>
        <Route path='Quiz1/' element={<Quiz1/>}/>
        <Route path='/Quiz2' element={<Quiz2/>}/>
        <Route path='/Quiz3' element={<Quiz3/>}/>
      </Routes>
    </BrowserRouter>
    </>
    
    
    
  )
}

export default Show;