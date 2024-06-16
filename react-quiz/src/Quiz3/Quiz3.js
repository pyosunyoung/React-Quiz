import React, { useState } from "react";
import Quiz3Item from './Quiz3Item';
import Swal from 'sweetalert2';
import '../style.css';
import './quiz3.css'
import { Link } from 'react-router-dom';
function Quiz3() {
  const initialQuestions = [
    { number: 8, price: 530 },
    { number: 9, price: 620 },
    { number: 7, price: 200 },
    { number: 12, price: 510 }
  ];

  const [userAnswers, setUserAnswers] = useState(initialQuestions.map(() => ({ ten: "", fifty: "", hundred: "" }))); // { ten: "", fifty: "", hundred: "" }구조 4개 생성 및 배열 초기화

  const handleAnswerChange = (index, coin, value) => {
    const newAnswers = [...userAnswers]; //배열안에 { ten: "", fifty: "", hundred: "" }구조 4개 들어감
    newAnswers[index][coin] = value; // coin = ten index=0 value= 3이 들어오면 { ten: "", fifty: "", hundred: "" }의 첫번째 객체의 ten의 값은 3이 되는것
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const correctAnswers = initialQuestions.map((question, index) => {
      const { ten, fifty, hundred } = userAnswers[index];
      const totalValue = (parseInt(ten, 10) * 10) + (parseInt(fifty, 10) * 50) + (parseInt(hundred, 10) * 100);
      const totalCount = (parseInt(ten, 10) || 0) + (parseInt(fifty, 10) || 0) + (parseInt(hundred, 10) || 0);
      return totalValue === question.price && totalCount === question.number;
    });

    const correctCount = correctAnswers.filter(answer => answer).length;
    const incorrectCount = correctAnswers.length - correctCount;

    Swal.fire({
      title: "결과",
      html: `<p>${correctCount}개 맞았습니다, ${incorrectCount}개 틀렸습니다</p>`,
      icon: correctCount === correctAnswers.length ? "success" : "error",
      timer: 1500,
    });
  };

  return (
    <div className='container'>
      
      <div className='quiz_text'>
        <h2>Q. ' 10원, 50원, 100원 ' 동전을 이용하여 제시된 금액이 되려면 각각 몇개씩 필요한지 적어보세요.</h2>
      </div>
      
      <div className='quiz_container3'>
        <div className='quiz3'>
          
          {initialQuestions.map((question, index) => ( //처음 생성된건 index1, 2 3 이렇게 map이니까 차례로 생성(4번 생성)
            <Quiz3Item
              key={index}
              number={question.number}
              price={question.price}
              answer={userAnswers[index]}
              onAnswerChange={(coin, value) => handleAnswerChange(index, coin, value)} 
            />
          ))}
        </div>
        
      </div>
      <button className='buttonR' onClick={handleSubmit}>Submit</button>
      <div className='next_page'>
      <Link to={'/Quiz4'} className='start-button'>다음문제</Link>
      </div>
    </div>
  );
}

export default Quiz3;