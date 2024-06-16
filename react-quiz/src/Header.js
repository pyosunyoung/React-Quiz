import React from "react";
import { Link } from 'react-router-dom';
import './style.css';
import { AiFillHome } from "react-icons/ai";
function Header() {
  return(
    <Link to={'/'} className='student-link'>
    <header className="QuizMain-header">
        <h1 className="QuizMain-title">인지 중재 치료</h1>
        <p className='QuizMian-title'>치매 환자의 인지 기능 향상과 일반인들의 치매 예방을 위한 두뇌 훈련 웹사이트</p>
        <div className="QuizMain-goHome">
        <Link to={'/'} className='student-link'><AiFillHome style={{height: '32px',width:'32px', cursor:'pointer'}}/></Link>
        </div>
        <p className="QuizMain-info">Team 5</p>
      </header>
    </Link>
    
  )

}

export default Header;