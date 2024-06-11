import React from 'react';
import IMG10 from './images/10원.jpg';
import IMG50 from './images/50원.jpg';
import IMG100 from './images/100원.jpg';

function Quiz3Item({ number, price, answer, onAnswerChange }) {
  const getImageStyle = (value) => {
    switch (value) {
      case 10:
        return { width: "50px", height: "50px" };
      case 50:
        return { width: "75px", height: "75px" };
      case 100:
        return { width: "100px", height: "100px" };
      default:
        return {};
    }
  };

  return (
    <div>
      <span>▶ 동전 {number}개로 {price}원 만들기</span>
      <div>
        <img src={IMG10} alt="10원" style={getImageStyle(10)} />
        <input
          type="number"
          value={answer.ten}
          onChange={(e) => onAnswerChange("ten", e.target.value)}
        />
      </div>
      <div>
        <img src={IMG50} alt="50원" style={getImageStyle(50)} />
        <input
          type="number"
          value={answer.fifty}
          onChange={(e) => onAnswerChange("fifty", e.target.value)}
        />
      </div>
      <div>
        <img src={IMG100} alt="100원" style={getImageStyle(100)} />
        <input
          type="number"
          value={answer.hundred}
          onChange={(e) => onAnswerChange("hundred", e.target.value)}
        />
      </div>
    </div>
  );
}

export default Quiz3Item;