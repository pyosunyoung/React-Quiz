import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import "./Quiz9.css";

function Quiz9() {
    const [answerWrite, setAnswerWrite] = useState('');
    const [random, setRandom] = useState([]);
    const [hint, setHint] = useState(false);
    const [correct, setCorrect] = useState(null);

    const sokdamGroup = [
        {
            gName: 'group1',
            gQuestion: "오는 말이 고와야 가는 말이 곱다",
            gAnswer: "가는 말이 고와야 오는 말이 곱다",
            gHint: "자기가 남에게 말이나 행동을 좋게 하여야 남도 자기에게 좋게 한다는 말.",
        },
        {
            gName: 'group2',
            gQuestion: "고래는 게 편",
            gAnswer: "가재는 게 편",
            gHint: "모양이나 형편이 서로 비슷하고 인연이 있는 것끼리 서로 잘 어울리고, 사정을 보아주며 감싸 주기 쉬움을 비유적으로 이르는 말.",
        },
        {
            gName: 'group3',
            gQuestion: "소똥도 약에 쓰려면 없다",
            gAnswer: "개똥도 약에 쓰려면 없다",
            gHint: "평소에 흔하던 것도 막상 긴하게 쓰려고 구하면 없다는 말.",
        },
        {
            gName: 'group4',
            gQuestion: "노력 끝에 낙이 온다",
            gAnswer: "고생 끝에 낙이 온다",
            gHint: "어려운 일이나 고된 일을 겪은 뒤에는 반드시 즐겁고 좋은 일이 생긴다는 말.",
        },
        {
            gName: 'group5',
            gQuestion: "소나기에 옷 젖는 줄 모른다",
            gAnswer: "가랑비에 옷 젖는 줄 모른다",
            gHint: "가늘게 내리는 비는 조금씩 젖어 들기 때문에 여간해서도 옷이 젖는 줄을 깨닫지 못한다는 뜻으로, 아무리 사소한 것이라도 그것이 거듭되면 무시하지 못할 정도로 크게 됨을 비유적으로 이르는 말.",
        },
        {
            gName: 'group6',
            gQuestion: "도둑 담 넘어가듯",
            gAnswer: "구렁이 담 넘어가듯",
            gHint: "일을 분명하고 깔끔하게 처리하지 않고 슬그머니 얼버무려 버림을 비유적으로 이르는 말.",
        },
        {
            gName: 'group7',
            gQuestion: "태산 모아 티끌",
            gAnswer: "티끌 모아 태산",
            gHint: "아무리 작은 것이라도 모이고 모이면 나중에 큰 덩어리가 됨을 비유적으로 이르는 말.",
        },
        {
            gName: 'group8',
            gQuestion: "사자도 제 말 하면 온다",
            gAnswer: "호랑이도 제 말 하면 온다",
            gHint: "깊은 산에 있는 호랑이조차도 저에 대하여 이야기하면 찾아온다는 뜻으로, 어느 곳에서나 그 자리에 없다고 남을 흉보아서는 안 된다는 말.",
        },
        {
            gName: 'group9',
            gQuestion: "사공이 많으면 배가 바다로 간다",
            gAnswer: "사공이 많으면 배가 산으로 간다",
            gHint: "여러 사람이 저마다 제 주장대로 배를 몰려고 하면 결국에는 배가 물로 못 가고 산으로 올라간다는 뜻으로, 주관하는 사람 없이 여러 사람이 자기주장만 내세우면 일이 제대로 되기 어려움을 비유적으로 이르는 말.",
        },
        {
            gName: 'group10',
            gQuestion: "쓰면 삼키고 달면 뱉는다",
            gAnswer: "달면 삼키고 쓰면 뱉는다",
            gHint: "옳고 그름이나 신의를 돌보지 않고 자기의 이익만 꾀함을 비유적으로 이르는 말.",
        },
    ];
    
    const sokdamRandom = parseInt(Math.random() * sokdamGroup.length);
    useEffect(() => {
        const group = sokdamGroup[sokdamRandom];
    // console.log(random);
        setRandom(group);
    }, []);

    const handleHint = () => {
        setHint(true);
    }

    const handleChange = (gName, value) => {
            setAnswerWrite({
                ...answerWrite,
                [gName]: value
            });
        };

    const handleCheck = () => {
        const isCorrect = answerWrite[random.gName] === random.gAnswer;
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
    }

    return (
        <main className="Quiz9-main">
            <div className="Quiz9-container">
                <h2>Q. 다음 속담의 틀린 부분을 바르게 고친 후 따라 읽어보세요.</h2>
                <h3 className="Quiz9-container-h3">문제) {random.gQuestion}</h3>
                {!hint && <button className="Quiz9-container-hint" onClick={handleHint}>힌트 보기</button>}
                {hint && <h4 className="Quiz9-container-h4">{random.gHint}</h4>}
            

                <div className="Quiz9-answer">
                    <div className="Quiz9-answer-content">
                        <label>
                            <input className="Quiz9-answer-content-inner" type="text" onChange={(event) => handleChange(random.gName, event.target.value)}/>
                        </label>
                        <button className="Quiz9-answer-button" onClick={handleCheck}>정답 확인</button>
                    </div>
                </div>

                <div className='next_page'>
                    
                    <Link to={'/Quiz10'} className='start-button'>다음문제</Link>
                </div>
            </div>
        </main>
    );
}

export default Quiz9;