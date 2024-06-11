import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import './main.css'
import StudentBox from './StudentBox';
import IMG1 from './리액트 팀원 사진/표선영님.jpg'
import IMG2 from './리액트 팀원 사진/고병현님.jpg'
import IMG3 from './리액트 팀원 사진/김미경님.jpg'
import IMG4 from './리액트 팀원 사진/조범상님.jpg'

function Main() {
  return (
    <div className='container'>
      <div className='content'>
        <div className='row'>
          <StudentBox img={IMG1} name={"표선영(팀장)"} id={"20203875"} department={"컴퓨터공학부"} />
          <StudentBox img={IMG2} name={"고병현"} id={"20191122"} department={"컴퓨터공학부"}/>
        </div>
        <div className='row'>
          <StudentBox img={IMG3} name={"김미경"} id={"20211284"} department={"컴퓨터공학부"}/>
          <StudentBox img={IMG4} name={"조범상"} id={"20203288"} department={"컴퓨터공학부"}/>
          
        </div>
      </div>
      <div className='next_page'>
        <p>toOtherPage</p>
        <Link to={'/Quiz1'} className='start-button'>시작하기</Link>
      </div>
    </div>
  );
}

export default Main;