import React from 'react';
import IMG10 from '../images/10원.jpg';
import IMG50 from '../images/50원.jpg';
import IMG100 from '../images/100원.jpg';
import './quiz3.css'

function Quiz3Item({ number, price, answer, onAnswerChange }) {
  return (
    <div className='quiz3-item'>
      <span className='quiz3-title'>▶ 동전 {number}개로 {price}원 만들기</span>
      <div className='quiz3-images'>
        <div className='quiz3-image'>
          <img src={IMG10} alt="10원" />
          <input
            type="number"
            value={answer.ten}
            onChange={(e) => onAnswerChange("ten", e.target.value)}
          />
        </div>
        <div className='quiz3-image'>
          <img src={IMG50} alt="50원" />
          <input
            type="number"
            value={answer.fifty}
            onChange={(e) => onAnswerChange("fifty", e.target.value)}
          />
        </div>
        <div className='quiz3-image'>
          <img src={IMG100} alt="100원" />
          <input
            type="number"
            value={answer.hundred}
            onChange={(e) => onAnswerChange("hundred", e.target.value)}
          />
          
        </div>
      </div>
      
    </div>
  );
}

export default Quiz3Item;