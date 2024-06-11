import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../style.css';
import QuizItem from './QuizItem';
import Swal from 'sweetalert2'

function Quiz1() {
  const [count, setCount] = useState(60);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [quizResults, setQuizResults] = useState(Array(5).fill(false));
  const [reset, setReset] = useState(false); // To trigger re-render of QuizItem
  const [input4, setInput4] = useState(""); // State for additional input
  const [maxNumber, setMaxNumber] = useState(null); // To store the maximum number from the calculations
  const [resultMessage, setResultMessage] = useState(""); // To store the result message for input4
  const Swal = require('sweetalert2')
  const updateScore = (index, isCorrect) => { // QuizItem에서 index값과 true인지 false인지 값을 가져옴
    setQuizResults((prevResults) => {
      const newResults = [...prevResults]; // [[], [], [], [], []] 이런느낌?
      newResults[index] = isCorrect;
      return newResults; // 정답을 맞춘 배열의 인덱스는 true로 변경 [false,false,false,false,false] 원래 이렇게 생성
    });
  };

  const checkAnswers = () => {
    const correctAnswers = quizResults.filter(result => result).length; // true인 배열의 값만 뽑아서 배열 재생성
    const incorrectAnswers = quizResults.length - correctAnswers; // 전체 배열 5에서 - true는 정답인것만 빼면 틀린 개수 나오겠지?

    // 클래스가 quiz인것과 number result인것을 numbers로 가져오고 maxnum은 그중 가장 큰 값을 뽑아내는 작업 
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
    setReset(prevReset => !prevReset); // Trigger reset
    
  };

  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => {
        if (count === 1) {
          setShowPopup(false);
          setCount(60);
          setReset(prevReset => !prevReset); // Trigger reset
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
      <div>
        <span className='Stage'>Quiz1</span>
      </div>
      <div className='quiz_text'>
        <h2>다음 보기를 보고 빈칸에 알맞은 부호를 넣어 가장 큰 숫자를 만드세요.</h2>
        <h4>조건 1 +, -를 모두 사용해야 합니다.</h4>
        <h4>조건 2 똑같은 연산자를 두번 사용할 수 없습니다.</h4>
        <h4>주의 : 시간이 경과하면 숫자는 랜덤으로 리셋됩니다.</h4>
      </div>
      <div className='example_container'>
        보기 + -
      </div>
      <div className='quiz_container'>
        <div className='timer'>
          timer : {count}
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
      <button onClick={checkAnswers}>Submit</button>
      {showPopup && (
        <div className='popup'>
          <h3>Quiz Results</h3>
          <p>{score.correct} correct, {score.incorrect} incorrect</p>
          <p>계산결과 가장 큰 숫자는? = {maxNumber}</p>
          <p>내가 쓴 답 : {input4}</p>
          <p>{resultMessage}</p>
        </div>
      )}
      <div className='next_page'>
        <Link to={'/Quiz2'}>다음문제</Link>
      </div>
    </div>
  );
}

export default Quiz1;