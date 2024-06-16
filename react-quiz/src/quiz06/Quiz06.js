import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Quiz06.css';
import { Link } from 'react-router-dom';
// 총 6개의 끝말잇기 세트
const wordSets = [
  [
    { img: "/imgs/바나나.jpg", word: '바나나' },
    { img: "/imgs/나무.jpg", word: '나무' },
    { img: "/imgs/무지개.jpg", word: '무지개' },
    { img: "/imgs/개미.jpg", word: '개미' },
    { img: "/imgs/미소.jpg", word: '미소' },
    { img: "/imgs/소금.jpg", word: '소금' }
  ],
  [
    { img: "/imgs/냉장고.jpg", word: '냉장고' },
    { img: "/imgs/고양이.jpg", word: '고양이' },
    { img: "/imgs/이불.jpg", word: '이불' },
    { img: "/imgs/불고기.jpg", word: '불고기' },
    { img: "/imgs/기차.jpg", word: '기차' },
    { img: "/imgs/차도.jpg", word: '차도' }
  ],
  [
    { img: "/imgs/연필.jpg", word: '연필' },
    { img: "/imgs/필통.jpg", word: '필통' },
    { img: "/imgs/통나무.jpg", word: '통나무' },
    { img: "/imgs/무궁화.jpg", word: '무궁화' },
    { img: "/imgs/화가.jpg", word: '화가' },
    { img: "/imgs/가수.png", word: '가수' }
  ]
];

const fixedPositions = [
  { x: 20, y: 50 },
  { x: 600, y: 380 },
  { x: 300, y: 30 },
  { x: 150, y: 300 },
  { x: 450, y: 50 },
  { x: 50, y: 160 },
  { x: 780, y: 30 },
  { x: 550, y: 180 },
  { x: 370, y: 350 },
  { x: 850, y: 150 }
];

function getRandomPositions(fixedPositions, count) {
  const shuffled = fixedPositions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function Quiz06() {
  const [positions, setPositions] = useState([]);
  const [answers, setAnswers] = useState(Array(6).fill(''));
  const [imageWords, setImageWords] = useState([]);
  const [usedIdx, setUsedIdx] = useState([]);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    generateQuiz();
  }, []);

  function generateQuiz() {
    let randomSetIndex;

    do {
      randomSetIndex = Math.floor(Math.random() * wordSets.length);
    } while (usedIdx.includes(randomSetIndex) && usedIdx.length < wordSets.length);

    setUsedIdx([...usedIdx, randomSetIndex]);
    const randomSet = wordSets[randomSetIndex];
    setImageWords(randomSet);

    const randomPositions = getRandomPositions(fixedPositions, 5);
    randomPositions.unshift({ x: 350, y: 200 }); // 첫 번째 이미지를 고정된 위치로 설정
    setPositions(randomPositions);
  }

  function handleInputChange(index, event) {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  }

  function checkAnswers() {
    const correctAnswers = imageWords.map((item) => item.word);
    const isCorrect = correctAnswers.every((word, index) => word === answers[index]);

    let newScore = score;
    if (isCorrect) {
      newScore += 1;
      setScore(newScore);
      Swal.fire({
        icon: 'success',
        title: '정답입니다!',
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
      if (newCount === 3) {
        Swal.fire({
          title: '점수',
          text: `${newScore} / 3`,
          confirmButtonText: '확인'
        }).then((result) => {
            /* 
              메인페이지로 넘기는 로직 구현 필요
            */
            setScore(0);
            setCount(0);
            setAnswers(Array(6).fill(''));
            setUsedIdx([]); // 인덱스 배열 초기화
            generateQuiz();
        });
      } else {
        setAnswers(Array(6).fill(''));
        generateQuiz();
      }
      return newCount;
    });
  }

  return (
    <div>
      <h2 style={{textAlign: "center"}}>
        Q. 사진들의 이름을 떠올리며 끝말잇기로 연결해보세요.(<b style={{color: "red"}}>빨간 테두리</b>가 시작)</h2>
      <div id="quiz06-container">
        {imageWords.map((item, index) => (
          <img
            key={index}
            src={item.img}
            alt={`img-${index}`}
            className={`img06 ${index === 0 ? 'start-img' : ''}`}
            style={{ left: positions[index]?.x, top: positions[index]?.y }}
          />
        ))}
      </div>
      <div id="answer06-container">
        {answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            value={answer}
            className='txt-boxes'
            onChange={(e) => handleInputChange(index, e)}
          />
        ))}
        <button className='quiz06-submit-btn' onClick={checkAnswers}>정답 확인</button>
      </div>
      <div className='next_page'>
      
        <Link to={'/Quiz7'} className='start-button'>다음문제</Link>
      
      </div>
    </div>
  );
}

export default Quiz06;
