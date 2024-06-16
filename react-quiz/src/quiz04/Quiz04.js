import React, { useState, useEffect } from "react";
import "./Quiz04.css";
import { FaArrowRotateRight } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

const images = [
  "/imgs/도형1.png",
  "/imgs/도형2.png",
  "/imgs/도형3.png",
  "/imgs/도형4.png",
];

const degrees = [45, 90, 135, 180, 225, 270, 315];


function getRandomDegree(cD) {
  const availableDegrees = degrees.filter((degree) => degree !== cD);
  return availableDegrees[Math.floor(Math.random() * availableDegrees.length)];
}

function generateRandomOptions(randomImage) {

  const correctDeg = degrees[Math.floor(Math.random() * degrees.length)];
  const rotatedImage = { img: randomImage, class: `rotate-${correctDeg}` };

  const optionDegrees = [correctDeg];
  while (optionDegrees.length < 3) {
    const newDegree = getRandomDegree(correctDeg);
    if (!optionDegrees.includes(newDegree)) {
      optionDegrees.push(newDegree);
    }
  }

  const optionImages = optionDegrees.map((deg) => ({
    img: randomImage,
    class: `rotate-${deg}`,
  }));

  optionImages.sort(() => Math.random() - 0.5);

  return { optionImages, rotatedImage, correctDeg};
}

function Quiz04(props) {
  const [currentImage, setCurrentImage] = useState(null);
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(null);
  const [correctDeg, setCorrectDeg] = useState(null);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    generateQuiz();
  }, []);

  function generateQuiz() {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const { optionImages, rotatedImage, correctDeg } = generateRandomOptions(randomImage);
    
    setCurrentImage(randomImage);
    setOptions(optionImages);
    setCorrectOption(rotatedImage);
    setCorrectDeg(correctDeg)
  }

  function checkAnswer(selectedOption) {
  setCount((prevCount) => {
    const newCount = prevCount + 1;
    let updatedScore = score;

    if (selectedOption.class === correctOption.class) {
      updatedScore += 1;
      setScore(updatedScore);
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

    if (newCount === 5) {
      Swal.fire({
        title: `점수`,
        text: `${updatedScore} / 5`,
          showConfirmButton: true
        }).then((result) => {
          props.setQuizNum("Quiz05");
        })
      setScore(0);
      setCount(0);
      generateQuiz();
    } else {
      generateQuiz();
    }

    return newCount;
  });
}

  return (
    <div className="quiz-container">
      
      <h2>{`Q. 아래 도형이 ${correctDeg}°회전한 모습을 골라보세요.`}</h2>
      <div className="quiz-block">
          <img src={currentImage} alt="Quiz" />
          <FaArrowRotateRight style={{height: '60px',width:'60px'}}/>
          <img src='/imgs/QuestionMark.png' alt="QuestionMark" style={{width:"300px"}}/>
      </div>
      <div className="answer-container">
        {options.map((option, index) => (
            <div className="option-container">
                <div className="option-number">
                    {index===0 ? '①' : index===1 ? '②' : '③'}
                </div>
                <img
                    key={index}
                    src={option.img}
                    alt={`Option ${index + 1}`}
                    onClick={() => checkAnswer(option)}
                    className={`answer-option ${option.class}`}
                />
            </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz04;
