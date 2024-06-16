import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import "./Quiz8.css";

function Quiz8() {
    const [selected1, setSelected1] = useState({ group1: null, group2: null, group3: null, group4: null });
    const [selected2, setSelected2] = useState(null);
    const [answerWrite, setAnswerWrite] = useState('');
    const [answerClick, setAnswerClick] = useState('');
    const [gender, setGender] = useState(null);
    const [totalScore, setTotalScore] = useState(0);
    const [correct, setCorrect] = useState(null);

    const testGroup = [
        {
            gName: 'group1',
            gQuestion: "1. 술을 얼마나 자주 마십니까?",
            gOptions: [
                { value: 1, label: "전혀 마시지 않는다", score: 0 },
                { value: 2, label: "한달에 한번 미만", score: 1 },
                { value: 3, label: "한달에 2 ~ 4회", score: 2 },
                { value: 4, label: "1주일에 2 ~ 3회", score: 3 },
                { value: 5, label: "1주일에 4회 이상", score: 4 },
            ]
        },
        {
            gName: 'group2',
            gQuestion: "2. 평소 술을 마실 때 몇 잔 정도 마십니까?",
            gOptions: [
                { value: 6, label: "0 ~ 2잔", score: 0 },
                { value: 7, label: "3 ~ 4잔", score: 1 },
                { value: 8, label: "5 ~ 6잔", score: 2 },
                { value: 9, label: "7 ~ 9잔", score: 3 },
                { value: 10, label: "10잔 이상", score: 4 },
            ]
        },
        {
            gName: 'group3',
            gQuestion: "3. 한번 술을 마실 때 소주 1병 또는 맥주 4병 이상의 음주는 얼마나 자주 하십니까?",
            gOptions: [
                { value: 11, label: "전혀 없다", score: 0 },
                { value: 12, label: "한달에 한번 미만", score: 1 },
                { value: 13, label: "한달에 한번", score: 2 },
                { value: 14, label: "1주일에 한번", score: 3 },
                { value: 15, label: "매일같이", score: 4 },
            ]
        },
        {
            gName: 'group4',
            gQuestion: "4. 친척이나 친구, 또는 의사가 당신이 술 마시는 것을 걱정하거나 술 끊기를 권유한 적이 있습니까?",
            gOptions: [
                { value: 16, label: "전혀 없다", score: 0 },
                { value: 17, label: "한달에 한번 미만", score: 1 },
                { value: 18, label: "한달에 한번", score: 2 },
                { value: 19, label: "1주일에 한번", score: 3 },
                { value: 20, label: "매일같이", score: 4 },
            ]
        }
    ];

    const resultGroup = [
        {
            gName: '저위험음주자',
            gNum1: '0 ~ 7점',
            gNum2: '0 ~ 4점',
        },
        {
            gName: '위험음주자',
            gNum1: '8 ~ 11점',
            gNum2: '5 ~ 7점',
        },
        {
            gName: '알코올사용장애추정자',
            gNum1: '12점 이상',
            gNum2: '8점 이상',
        },
    ];

    const handleChange = (gName, score) => {
        setSelected1({
            ...selected1,
            [gName]: score
        });
    };

    useEffect(() => {
        const score = Object.values(selected1).reduce((acc, value) => acc + (value !== null ? value : 0), 0);
        setTotalScore(score);

        if(gender === "남성") {
            if (score >= 0 && score <= 7) setSelected2('0 ~ 7점');
            else if (score >= 8 && score <= 11) setSelected2('8 ~ 11점');
            else if (score >= 12 && score <= 16) setSelected2('12점 이상');
        
        } else if(gender === "여성") {
            if (score >= 0 && score <= 4) setSelected2('0 ~ 4점');
            else if (score >= 5 && score <= 7) setSelected2('5 ~ 7점');
            else if (score >= 8 && score <= 16) setSelected2('8점 이상');
        }
    }, [selected1, gender]);

    const handleGender = (gender) => {
        setGender(gender);
    }

    const handleResultClick = (range) => {
        setAnswerClick(range);
    };

    const handleCheck = () => {
        const isCorrect = (Number(answerWrite) === totalScore) && (answerClick === selected2);
        setCorrect(isCorrect);

        if(isCorrect) {
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
    };

    return (
        <>
            <main className="Quiz8-main">
                <div className="Quiz8-container">
                    <h2>Q. 음주 습관에 대한 자가 체크리스트입니다. 해당 사항을 클릭하세요.</h2>
                    <table className="Quiz8-table" border={1}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>0점</th>
                                <th>1점</th>
                                <th>2점</th>
                                <th>3점</th>
                                <th>4점</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testGroup.map(test => (
                                <tr key={test.gName}>
                                    <td width={"35%"}>{test.gQuestion}</td>
                                    {[0, 1, 2, 3, 4].map(score => (
                                        <td
                                            key={score}
                                            className={selected1[test.gName] === score ? "Quiz8-table-selected" : ""}
                                            onClick={() => handleChange(test.gName, score)}>

                                                {test.gOptions
                                                    .filter(option => option.score === score)
                                                    .map(option => option.label)
                                                }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                
                    <div className="Quiz8-answer">
                        <div className="Quiz8-answer-content">
                            1. 귀하의 점수는 <input className="Quiz8-answer-content-inner" value={answerWrite} onChange={(e) => setAnswerWrite(e.target.value)} /> 점입니다.
                            <br />
                            2. 아래의 표에서 본인의 성별과 점수에 해당하는 영역을 누르세요.
                            <table className="Quiz8-table-answer" align="center" border={1}>
                                <thead>
                                    <tr>
                                        <td width={"45%"}></td>
                                        <td id="Quiz8-table-click"
                                            className={`Quiz8-table-click ${gender === "남성" ? "Quiz8-table-selected" : ""}`}
                                            onClick={() => handleGender("남성")}>남성
                                        </td>
                                        <td id="Quiz8-table-click"
                                            className={`Quiz8-table-click ${gender === "여성" ? "Quiz8-table-selected" : ""}`}
                                            onClick={() => handleGender("여성")}>여성
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultGroup.map(result => (
                                        <tr key={result.gName}>
                                            <td>{result.gName}</td>
                                            <td 
                                                id="Quiz8-table-click" 
                                                className={answerClick === result.gNum1 ? "Quiz8-table-selected" : ""} 
                                                onClick={() => handleResultClick(result.gNum1)}>
                                                    {result.gNum1}
                                            </td>
                                            <td 
                                                id="Quiz8-table-click" 
                                                className={answerClick === result.gNum2 ? "Quiz8-table-selected" : ""} 
                                                onClick={() => handleResultClick(result.gNum2)}>
                                                    {result.gNum2}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="Quiz8-answer-button-content">
                            <button className="Quiz8-answer-button" onClick={handleCheck}>정답 확인</button>
                        </div>
                    </div>

                    <div className='next_page'>
                        
                        <Link to={'/Quiz9'} className='start-button'>다음문제</Link>
                    </div>
                </div>
            </main>
            
        </>
    );
}

export default Quiz8;
