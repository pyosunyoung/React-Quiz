import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../style.css';

function Quiz2() {
  const arrowBox = ["↗", "↙", "↖", "↘", "↕"];
  const arrowToNumber = {
    "↗": 1,
    "↙": 2,
    "↖": 3,
    "↘": 4,
    "↕": 5,
  };

  const getRandomArrow = () => {
    return arrowBox[Math.floor(Math.random() * arrowBox.length)];
  };

  const generateRandomArrows = () => {
    return Array.from({ length: 5 }, () => getRandomArrow());
  };

  const [randomArrows, setRandomArrows] = useState(generateRandomArrows());
  const [inputs, setInputs] = useState(Array(5).fill(""));
  const [randomArrows2, setRandomArrows2] = useState(generateRandomArrows());
  const [inputs2, setInputs2] = useState(Array(5).fill(""));

  // Handler for reset button
  const handleReset = () => {
    setRandomArrows(generateRandomArrows());
    setInputs(Array(5).fill(""));
    setRandomArrows2(generateRandomArrows());
    setInputs2(Array(5).fill(""));
  };

  const handleChange = (index, value, isSecondSet) => {
    if (isSecondSet) {
      const newInputs = [...inputs2];
      newInputs[index] = value;
      setInputs2(newInputs);
    } else {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
    }
  };

  const handleSubmit = () => {
    const correctAnswers = randomArrows.map(arrow => arrowToNumber[arrow]);
    const userAnswers = inputs.map(input => Number(input));

    const correctAnswers2 = randomArrows2.map(arrow => arrowToNumber[arrow]);
    const userAnswers2 = inputs2.map(input => Number(input));

    const incorrectAnswers = userAnswers.filter((answer, index) => answer !== correctAnswers[index]);
    const incorrectAnswers2 = userAnswers2.filter((answer, index) => answer !== correctAnswers2[index]);

    if (incorrectAnswers.length === 0 && incorrectAnswers2.length === 0) {
      Swal.fire({
        title: "Good job!",
        text: "All answers are correct!",
        icon: "success",
        timer: 1500,
        didClose: handleReset 
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Some answers are incorrect.",
        footer: `<p>Correct answers: ${correctAnswers.join(", ")} and ${correctAnswers2.join(", ")}</p>`,
        timer: 1500,
      });
    }
  };

  return (
    <div className='container'>
      <div>
        <span className='Stage'>화살표→숫자 적기</span>
      </div>
      <div className='quiz_text'>
        <h2>화살표가 다양한 방향으로 그려져 있습니다.<br />빈칸에 보기와 같이 알맞은 숫자를 적어보세요.</h2>
      </div>
      <div className='example_container'>
        <table border={1}>
          <thead>
            <tr>
              <th colSpan={5}>보기</th>
            </tr>
            <tr>
              {arrowBox.map((a, index) => <td key={index}>{index + 1}</td>)}
            </tr>
            <tr>
              {arrowBox.map((arrow, index) => <td key={index}>{arrow}</td>)}
            </tr>
          </thead>
        </table>
      </div>
      <div className='quiz_container'>
        <div className='change_button'>
          <button onClick={handleReset}>리셋</button>
        </div>
        <div className='quiz'>
          <table border={1}>
            <tbody>
              <tr>
                {randomArrows.map((arrow, index) => <td key={index}>{arrow}</td>)}
              </tr>
              <tr>
                {randomArrows.map((_, index) => (
                  <td key={index}>
                    <input
                      value={inputs[index]}
                      onChange={(e) => handleChange(index, e.target.value, false)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                {randomArrows2.map((arrow, index) => <td key={index}>{arrow}</td>)}
              </tr>
              <tr>
                {randomArrows2.map((_, index) => (
                  <td key={index}>
                    <input
                      value={inputs2[index]}
                      onChange={(e) => handleChange(index, e.target.value, true)}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className='next_page'>
        <Link to={'/Quiz3'}>다음문제</Link>
      </div>
    </div>
  );
}

export default Quiz2;