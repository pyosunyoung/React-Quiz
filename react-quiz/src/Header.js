import React from "react";
import { Link } from 'react-router-dom';
import './style.css';
function Header() {
  return(
    <header className="QuizMain-header">
        <h1 className="QuizMain-title">인지 중재 치료</h1>
        <p className='QuizMian-title'>치매 환자의 인지 기능 향상과 일반인들의 치매 예방을 위한 두뇌 훈련 웹사이트</p>
        <p className="QuizMain-info">20203875 표선영</p>
      </header>
    
  )

}

export default Header;