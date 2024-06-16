import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../style.css';
import './quiz1.css'
import QuizItem from './QuizItem';
import Swal from 'sweetalert2'

function Quiz1() {
  const [count, setCount] = useState(60);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [quizResults, setQuizResults] = useState(Array(5).fill(false));
  const [reset, setReset] = useState(false); 
  const [input4, setInput4] = useState(""); 
  const [maxNumber, setMaxNumber] = useState(null); 
  const [resultMessage, setResultMessage] = useState(""); 
  const Swal = require('sweetalert2')
  const updateScore = (index, isCorrect) => { 
    setQuizResults((prevResults) => {
      const newResults = [...prevResults]; 
      newResults[index] = isCorrect;
      return newResults; 
    });
  };

  const checkAnswers = () => {
    const correctAnswers = quizResults.filter(result => result).length; 
    const incorrectAnswers = quizResults.length - correctAnswers; 

   
    const numbers = document.querySelectorAll('.quiz .number-result');
    const maxNum = Math.max(...Array.from(numbers).map(num => parseInt(num.innerText, 10)));

    setMaxNumber(maxNum);
    const userAnswer = parseInt(input4, 10);

    if (userAnswer === maxNum) {
      setResultMessage("정답입니다!");
      Swal.fire({
        title: "정답입니다!",
        text: `가장 큰 숫자는 ${maxNum}입니다.`,
        icon: "success",
        footer: `<p>Your answer: ${userAnswer}</p>`,
        timer: 1500,
      });
    } else {
      setResultMessage("틀렸습니다ㅠ");
      Swal.fire({
        icon: "error",
        title: "틀렸습니다ㅜ",
        text: `가장 큰 숫자는 ${maxNum}입니다.`,
        footer: `<p>Your answer: ${userAnswer}</p>`,
        timer: 1500,
      });
    }

    setScore({ correct: correctAnswers, incorrect: incorrectAnswers });
    setShowPopup(true);
    setCount(60);
    setReset(prevReset => !prevReset); 
    
  };

  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => {
        if (count === 1) {
          setShowPopup(false);
          setCount(60);
          setReset(prevReset => !prevReset); 
          setInput4("");
          return 60;
        }
        return count - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className='container'>
      
      <div className='quiz_text'>
        <h2>Q. 다음 보기를 보고 빈칸에 알맞은 부호를 넣어 가장 큰 숫자를 만드세요.</h2>
      </div>
      <div className='condition_box'>
        <h4>조건 1 +, -를 모두 사용해야 합니다.</h4>
        <h4>조건 2 똑같은 연산자를 두번 사용할 수 없습니다.</h4>
      </div>
      <div className='warning_box'>
        <h4>주의 : 시간이 경과하면 숫자는 랜덤으로 리셋됩니다.</h4>
        <h4>주의 : submit 버튼을 누르면 숫자는 랜덤으로 리셋됩니다.</h4>
      </div>
      <div className='example_container'>
        <div className='example-box'>보기</div>
        <div className='example-operators'>+ , -</div>
      </div>
      <div className='quiz_container'>
        <div className='timer'>
          Timer : {count}
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <QuizItem key={index} index={index} updateScore={updateScore} reset={reset} />
        ))}
      </div>
      <input
        className='input4'
        value={input4}
        onChange={(e) => setInput4(e.target.value)}
        placeholder="계산결과 가장 큰 숫자는?"
      />
      <button className='buttonR' onClick={checkAnswers}>Submit</button>
      {showPopup && (
        <div className='popup'>
          <h3>Quiz Results</h3>
          <p>{score.correct}개 맞았습니다, {score.incorrect}개 틀렸습니다</p>
          <p>계산결과 가장 큰 숫자는? = {maxNumber}</p>
          <p>내가 쓴 답 : {input4}</p>
          <p>{resultMessage}</p>
        </div>
      )}
      <div className='next_page'>
        <Link to={'/Quiz2'} className='start-button'>다음문제</Link>
      </div>
    </div>
  );
}

export default Quiz1;