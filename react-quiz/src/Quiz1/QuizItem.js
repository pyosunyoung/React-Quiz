import React, { useState, useEffect } from "react";

const QuizItem = ({ index, updateScore, reset }) => {
  const [number, setNumber] = useState(Math.floor(Math.random() * 50));
  const [number1, setNumber1] = useState(Math.floor(Math.random() * 50));
  const [number2, setNumber2] = useState(Math.floor(Math.random() * 50));
  const [operator1, setOperator1] = useState("");
  const [operator2, setOperator2] = useState("");
  const [inputResult, setInputResult] = useState("");
  const [error, setError] = useState("");

  const handleOperatorChange = (operator, type) => {
    if (type === "operator1") {
      if (operator === "" || operator === "+" || operator === "-") {
        if (operator2 && operator2 === operator) {
          setError("같은 연산자를 두 번 사용할 수 없습니다.");
          setOperator1("");
        } else {
          setOperator1(operator);
          setError("");
        }
      }
    } else if (type === "operator2") {
      if (operator === "" || operator === "+" || operator === "-") {
        if (operator1 && operator1 === operator) {
          setError("같은 연산자를 두 번 사용할 수 없습니다.");
          setOperator2("");
        } else {
          setOperator2(operator);
          setError("");
        }
      }
    }
  };

  const result = () => {
    if (operator1 === "+") {
      return number + number1;
    } else if (operator1 === "-") {
      return number - number1;
    }
    return null;
  };

  const result2 = () => {
    const intermediateResult = result();
    if (operator2 === "+") {
      return intermediateResult + number2;
    } else if (operator2 === "-") {
      return intermediateResult - number2;
    }
    return null;
  };

  useEffect(() => { // inputResult값이 바뀔 때 이 함수 사용됨
    const res2 = result2(); // 
    if (parseInt(inputResult) === res2) { // 일치하면 정답 true 반환
      updateScore(index, true);
    } else {
      updateScore(index, false); // 틀림 false 반환
    }
  }, [inputResult]);

  useEffect(() => {
    setNumber(Math.floor(Math.random() * 50));
    setNumber1(Math.floor(Math.random() * 50));
    setNumber2(Math.floor(Math.random() * 50));
    setOperator1("");
    setOperator2("");
    setInputResult("");
    setError("");
  }, [reset]);

  return (
    <div className='quiz'>
      Random Number: {number}
      <input
        type='text'
        value={operator1}
        onChange={(e) => handleOperatorChange(e.target.value, "operator1")}
        maxLength="1"
      />
      {number1}
      <input
        type='text'
        value={operator2}
        onChange={(e) => handleOperatorChange(e.target.value, "operator2")}
        maxLength="1"
      />
      {number2} = 
      <input
        type='text'
        value={inputResult}
        onChange={(e) => setInputResult(e.target.value)}
      />
      <span className="number-result">{result2()}</span>
      {error && <div className='error'>{error}</div>}
    </div>
  );
};

export default QuizItem;