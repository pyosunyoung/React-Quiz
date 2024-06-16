import React from 'react';
import Swal from 'sweetalert2';
import './App.css';  

class Quize10 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'main',
      date: new Date().toLocaleDateString(),
      answers: {
        time1: { hours: 0, minutes: 0 },
        time2: { hours: 0, minutes: 0 },
        time3: { hours: 0, minutes: 0 },
      }
    };
  }

  navigate = (page) => {
    this.setState({ currentPage: page });
  };

  handleTimeSelect = (index, h, m) => {
    const newAnswers = { ...this.state.answers };
    newAnswers[`time${index}`] = { hours: h, minutes: m };
    this.setState({ answers: newAnswers });
  };

  handleSubmit = () => {
    const correctAnswers = {
      time1: { hours: 11, minutes: 30 },
      time2: { hours: 12, minutes: 0 },
      time3: { hours: 14, minutes: 25 }, 
    };
  
    let correctCount = 0;
    Object.keys(correctAnswers).forEach((key) => {
      if (
        this.state.answers[key].hours === correctAnswers[key].hours &&
        this.state.answers[key].minutes === correctAnswers[key].minutes
      ) {
        correctCount += 1;
      }
    });
  
    let message = '';
    if (correctCount === 1) {
      message = '1문제 정답입니다.';
    } else if (correctCount === 2) {
      message = '2문제 정답입니다.';
    } else if (correctCount === 3) {
      message = '모두 맞히셨습니다.';
    } else {
      message = '오답입니다.';
    }

    Swal.fire({
      title: '결과가 나왔습니다',
      text: message,
      icon: correctCount === 3 ? 'success' : 'error',
    });
  };

  renderMainPage() {
    return (
      <div className="quiz-page">  
        <header>
          <h1>인지 중재 치료</h1>
          <p>{this.state.date}</p>
          <p>날씨 정보는 여기에 표시됩니다.</p>
        </header>
        <main>
          <div className="maintext-box">
            승희 씨는 여고 동창들과 <u>11시 30분에 강남역</u>에서 점심을 먹기로 하였습니다.<br />
            약속 장소에서 메뉴를 고르던 친구들의 의견은 나뉘었습니다.<br />
            승희 씨는 “설렁탕이요”, 명자 씨와 미자 씨는 “삼계탕이 먹고 싶다”고 하였습니다.<br />
            그리고 인순 씨는 “다수의 의견에 따르겠네”라고 말하였습니다.<br />
            그러하여 점심메뉴는 “삼계탕”으로 정해졌습니다.<br />
            <u>12시에</u> “한남우 합창실”에 도착하여 4인분을 주문하여 맛있게 먹었습니다.<br />
            삼계탕은 1인분에 12,000원씩 하였는데 계산은 의견을 낸 명자 씨가 하였습니다.<br />
            점심을 먹고 난 후에는 커피를 마시며 향찬식과 옛 추억에 대해 이야기하였습니다.<br />
            친구들과 헤어진 승희 씨는 노래교실에 참여하기 위해 <u>2시 25분에</u> “행복 복지관”으로 갔습니다.<br />
            노래 교실이 끝난 후 식당에 들러 저녁식사를 위한 불고기 재료를 구입하고 집으로 돌아왔습니다.
          </div>
          <div>
            <button className="start-button" onClick={() => this.navigate('quiz')}>퀴즈 시작</button>
          </div>
        </main>
      </div>
    );
  }

  renderQuizPage() {
    return (
      <div className="quiz-page">
        <header>
          <h1>인지 중재 치료</h1>
        </header>
        <main>
          <div className="question-container">
            <div className="question">
              <ClockComponent
                index={1}
                hours={this.state.answers.time1.hours}
                minutes={this.state.answers.time1.minutes}
                onTimeSelect={this.handleTimeSelect}
              />
              <p>
                승희는 외출을 준비하고{' '}
                <input
                  type="text"
                  value={`${this.state.answers.time1.hours}시`}
                  readOnly
                />
                시{' '}
                <input
                  type="text"
                  value={`${this.state.answers.time1.minutes}분`}
                  readOnly
                />
                분 친구들과 점심약속을 위해 강남역에 갔습니다.
              </p>
            </div>
            <div className="question">
              <ClockComponent
                index={2}
                hours={this.state.answers.time2.hours}
                minutes={this.state.answers.time2.minutes}
                onTimeSelect={this.handleTimeSelect}
              />
              <p>
                명자씨는{' '}
                <input
                  type="text"
                  value={`${this.state.answers.time2.hours}시`}
                  readOnly
                />
                시{' '}
                <input
                  type="text"
                  value={`${this.state.answers.time2.minutes}분`}
                  readOnly
                />
                분 한남우 합창실에 도착하였습니다.
              </p>
            </div>
            <div className="question">
              <ClockComponent
                index={3}
                hours={this.state.answers.time3.hours}
                minutes={this.state.answers.time3.minutes}
                onTimeSelect={this.handleTimeSelect}
              />
              <p>
                승희씨는{' '}
                <input
                  type="text"
                  value={`${this.state.answers.time3.hours}시`}
                  readOnly
                />
                시{' '}
                <input
                  type="text"
                  value={`${this.state.answers.time3.minutes}분`}
                  readOnly
                />
                분에 행복복지관에 도착하였습니다.
              </p>
            </div>
          </div>
          <div className="button-container">
            <button className="previous-button" onClick={() => this.navigate('main')}>
              이전
            </button>
            <button className="submit-button" onClick={this.handleSubmit}>
              제출
            </button>
          </div>
        </main>
      </div>
    );
  }

  render() {
    return this.state.currentPage === 'main' ? this.renderMainPage() : this.renderQuizPage();
  }
}

class ClockComponent extends React.Component {
  handleHoursChange = (event) => {
    const newHours = parseInt(event.target.value, 10);
    this.props.onTimeSelect(this.props.index, newHours, this.props.minutes);
  };

  handleMinutesChange = (event) => {
    const newMinutes = parseInt(event.target.value, 10);
    this.props.onTimeSelect(this.props.index, this.props.hours, newMinutes);
  };

  render() {
    const hourRotation = (this.props.hours % 12) * 30 + (this.props.minutes / 2); 
    const minuteRotation = this.props.minutes * 6; 

    return (
      <div className="clock-container">
        <div className="clock">
          <div
            className="hour-arm"
            style={{ transform: `rotate(${hourRotation + 90}deg)` }}
          />
          <div
            className="minute-arm"
            style={{ transform: `rotate(${minuteRotation + 90}deg)` }}
          />
        </div>
        <div className="time-selectors">
          <label>
            시:
            <input
              type="number"
              value={this.props.hours}
              onChange={this.handleHoursChange}
              min="0"
              max="23"
            />
          </label>
          <label>
            분:
            <input
              type="number"
              value={this.props.minutes}
              onChange={this.handleMinutesChange}
              min="0"
              max="59"
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Quize10;
