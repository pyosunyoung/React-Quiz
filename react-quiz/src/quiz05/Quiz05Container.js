import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Quiz05Container.css";
import { Link } from 'react-router-dom';
function Quiz05Container(props) {
  const samples = props.samples;
  const [quiz, setQuiz] = useState({});
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState("");
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setQuiz(randomQuiz());
  }, []);

  function randomQuiz() {
    let num1, num2, num3, total;

    function randomNum() {
      do {
        num1 = Math.floor(Math.random() * 99 + 1);
        num2 = Math.floor(Math.random() * 99 + 1);
        num3 = Math.floor(Math.random() * 99 + 1);
      } while (num1 === num2 || num2 === num3 || num3 === num1);

      total = num1 + num2 - num3;

      if (total <= 0 || total > 100) {
        randomNum();
      }
    }

    randomNum();

    while (total < 0 || total > 100) {
      randomNum();
      total = num1 + num2 - num3;
    }

    setCorrect(changeIntToChn(total));
    return { num1, num2, num3, total };
  }

  function changeIntToChn(num) {
    if (num <= 10) {
      const resultChn = samples.find((item) => item.value === num);
      return resultChn ? resultChn.char : "";

    } else {

      const tens = Math.floor(num / 10);
      const units = num % 10 !== 0 ? num % 10 : "";
      const tenChn = samples.find((item) => item.value === tens);
      const tenChar = tenChn ? tenChn.char : "";

      if (units !== "") {
        const unitChn = samples.find((item) => item.value === units);
        const unitChar = unitChn ? unitChn.char : "";
        return tenChar + "十" + unitChar;
        
      } else {
        return tenChar + "十";
      }
    }
  }

  function handleChnBtn(chn) {
    setAnswer((prev) => prev + chn);
  }

  function handleClear() {
    setAnswer("");
  }

  function handleSubmit() {
    let newScore = score;
    if (answer === correct) {
      newScore += 1;
      setScore(newScore);
      Swal.fire({
        icon: "success",
        title: "정답입니다!",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: 'error',
        text: '오답입니다. :(',
        showConfirmButton: false,
        timer: 1500
      });
    }
  
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 5) {
        Swal.fire({
          title: `점수`,
          text: `${newScore} / 5`,
          confirmButtonText: '확인'
        }).then((result) => {
            props.setQuizNum("Quiz06");
        });
      } else {
        setAnswer("");
        setQuiz(randomQuiz());
      }
      return newCount;
    });
  }

  return (
    <>
      <div className="quiz05-container5">
        <div className="quiz05-div5">
          {changeIntToChn(quiz.num1)} + {changeIntToChn(quiz.num2)} - {changeIntToChn(quiz.num3)} =
          <div className="input-container5">
            <input type="text" value={answer} readOnly className="answer-box5" />
            <div className="button-container5">
              <button className="clear-button5" onClick={handleClear}>
                ←
              </button>
              <button className="submit-button5" onClick={handleSubmit}>
                ✓
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2 style={{marginTop:"1rem",marginBottom:0, textAlign:"left"}}>입력</h2>
      <div className="answer05-container5">
        {samples.map((item) => (
          <div
            key={item.value}
            className="answer05-button5"
            onClick={() => handleChnBtn(item.char)}
          >
            {item.char}
          </div>
        ))}
        
      </div>
      <div className='next_page'>
      
        <Link to={'/Quiz6'} className='start-button'>다음문제</Link>
      
      </div>
    </>
  );
}

export default Quiz05Container;
