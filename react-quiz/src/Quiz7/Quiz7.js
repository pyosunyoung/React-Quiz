import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Quiz7.css";

import Quiz7_1 from "./Quiz7_1";
import Quiz7_2 from "./Quiz7_2";
import Quiz7_3 from "./Quiz7_3";

import img1 from "./assets/나비자세.jpg";
import img2 from "./assets/비둘기자세.jpg";
import img3 from "./assets/굴렁쇠자세.jpg";
import img4 from "./assets/아치자세.jpg";

const tableGroup = [
    {
        gNumber: '1번',
        gImg: img1,
        gName: '나비 자세',
        gOption: '앉은 자세',
        gGood: '골반교정',
    },
    {
        gNumber: '2번',
        gImg: img2,
        gName: '비둘기 자세',
        gOption: '앉은 자세',
        gGood: '어깨결림 완화',
    },
    {
        gNumber: '3번',
        gImg: img3,
        gName: '굴렁쇠 자세',
        gOption: '누운 자세',
        gGood: '혈액순환',
    },
    {
        gNumber: '4번',
        gImg: img4,
        gName: '아치 자세',
        gOption: '누운 자세',
        gGood: '허리통증 완화',
    },
];

const q1 = <Quiz7_1  img1={img1} img2={img2} img3={img3} img4={img4} />;
const q2 = <Quiz7_2  img1={img1} img2={img2} img3={img3} img4={img4} />;
const q3 = <Quiz7_3  img1={img1} img2={img2} img3={img3} img4={img4} />;

function Quiz7() {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setVisible(false);
        }, 2000);
        return () => clearTimeout(timeOut);
    }, []);

    const [invisible, setInvisible] = useState(false);
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setInvisible(true);
        }, 2000);
        return () => clearTimeout(timeOut);
    }, []);
    
    const questions = [q1, q2, q3];
    const random = parseInt(Math.random() * questions.length);
   
    return (
        <> 
            {visible && 
            <main className="Quiz7-main"> 
                <div className="Quiz7-container">
                    <h2>Q. 다음은 각 요가자세와 효과입니다. 요가자세와 효과를 기억해 주세요. 2분 후 문제가 나타납니다.</h2>
                    <table className="Quiz7-table" align="center" border={1}>
                        <thead><th colSpan={4}>[ 보기 ]</th></thead>
                        <tbody>
                            {tableGroup.map((tableGroup) => (
                                <>
                                    <tr>
                                        <th rowSpan={3}>{tableGroup.gNumber}</th>
                                        <td rowSpan={3}><img src={tableGroup.gImg}/></td>
                                        <td width="40%" colSpan={2}>{tableGroup.gName}</td>
                                    </tr>

                                    <tr>
                                        <td width="15%">자세 분류</td>
                                        <td>{tableGroup.gOption}</td>
                                    </tr>

                                    <tr>
                                        <td width="15%">효과</td>
                                        <td>{tableGroup.gGood}</td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            }
            {invisible &&
            <>
                <main className="Quiz7-main">
                    <div className="Quiz7-container">
                        {questions[random]}

                        <div className='next_page'>
                            
                            <Link to={'/Quiz8'} className='start-button'>다음문제</Link>
                        </div>
                    </div>
                </main>
            </>
            }
        </>
    );
}

export default Quiz7;