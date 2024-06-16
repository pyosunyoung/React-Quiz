import { useState } from "react";
import Swal from 'sweetalert2';

function useQuiz7(component) {
    const [answerWrite, setAnswerWrite] = useState(Array(4).fill(''));
    const [correct, setCorrect] = useState('');

    var component;
    var answerCheck;
    const answerNum = ['(가)', '(나)', '(다)', '(라)'];
    if (component === 'Quiz7_1') {
        answerCheck = ['나비 자세', '비둘기 자세', '굴렁쇠 자세', '아치 자세'];
    } else if (component === 'Quiz7_2') {
        answerCheck = ['앉은 자세', '앉은 자세', '누운 자세', '누운 자세'];
    } else if (component === 'Quiz7_3') {
        answerCheck = ['골반교정', '어깨결림 완화', '혈액순환', '허리통증 완화'];
    }
    
    const handleChange = (index, value) => {
        const newAnswer = [...answerWrite];
        newAnswer[index] = value;
        setAnswerWrite(newAnswer);
    };

    const handleClick = () => {
        const isCorrect = answerWrite.every((answer,index) => answer == answerCheck[index]);
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

    return [answerWrite, correct, answerNum, handleChange, handleClick];
}

export default useQuiz7;