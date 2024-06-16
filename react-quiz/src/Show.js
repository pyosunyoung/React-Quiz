import {React, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz1 from './Quiz1/Quiz1';
import Quiz2 from './Quiz2/Quiz2';
import Quiz3 from './Quiz3/Quiz3';
import Quiz4 from './quiz04/Quiz04';
import Quiz5 from './quiz05/Quiz05';
import Quiz6 from './quiz06/Quiz06';
import Quiz7 from './Quiz7/Quiz7';
import Quiz8 from './Quiz8/Quiz8'
import Quiz9 from './Quiz9/Quiz9';
import Quiz10 from './Quiz10/Quize10';
import Header from './Header';
import Main from './Main';
const Show = () => {
  const [quizNum, setQuizNum] = useState("Quiz04");

  function quizRender() {
    if (quizNum === "Quiz04") {
      return <Quiz4 setQuizNum={setQuizNum} />;
    } else if (quizNum === "Quiz05") {
      return <Quiz5 setQuizNum={setQuizNum} />;
    } else {
      return <Quiz6 setQuizNum={setQuizNum} />;
    }
  }

  return(
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
      <Route path='/' element={<Main/>}/>
        <Route path='Quiz1/' element={<Quiz1/>}/>
        <Route path='/Quiz2' element={<Quiz2/>}/>
        <Route path='/Quiz3' element={<Quiz3/>}/>
        <Route path='/Quiz4' element={quizRender()}/>
        <Route path='/Quiz5' element={quizRender()}/>
        <Route path='/Quiz6' element={<Quiz6/>}/>
        <Route path='/Quiz7' element={<Quiz7/>}/>
        <Route path='/Quiz8' element={<Quiz8/>}/>
        <Route path='/Quiz9' element={<Quiz9/>}/>
        <Route path='/Quiz10' element={<Quiz10/>}/>
        

      </Routes>
    </BrowserRouter>
    </>
    
    
    
  )
}

export default Show;