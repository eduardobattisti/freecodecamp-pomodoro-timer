import React, { useState, useEffect } from 'react';
import {
	FaPlay, FaPause, FaReplyAll, FaPlus, FaMinus,
} from 'react-icons/fa';
import { Button, Screen } from '../../components';

import './style.scss';

const Alarm = () => {
	// States
	const [timer, setTimer] = useState(new Date('', '', '', '', 25, 0));
	const [minutes, setMinutes] = useState(timer.getMinutes().toLocaleString('pt-BR', {
		minimumIntegerDigits: 2,
	}));
	const [seconds, setSeconds] = useState(timer.getSeconds().toLocaleString('pt-BR', {
		minimumIntegerDigits: 2,
	}));
	const [isRunning, setRunning] = useState(false);
	const [intervalId, setIntervalId] = useState(0);
	const [totalSeconds, setTotalSeconds] = useState(0);
	const [breakTime, setBreaktime] = useState(new Date('', '', '', '', 5, 0));
	const [pomodoroTimer, setPomodoroTimer] = useState(new Date('', '', '', '', 25, 0));
	const [isBreakTime, setIsBreakTime] = useState(false);
	const [startBreak, setStartBreak] = useState(false);

	const onClickPlayPause = () => {
		if (!isRunning) {
			const alarmOn = setInterval(() => {
				timer.setSeconds(timer.getSeconds() - 1);
				setMinutes(timer.getMinutes().toLocaleString('pt-BR', {
					minimumIntegerDigits: 2,
				}));
				setSeconds(timer.getSeconds().toLocaleString('pt-BR', {
					minimumIntegerDigits: 2,
				}));
			}, 50);
			setIntervalId(alarmOn);
			setRunning(true);
		} else {
			setRunning(false);
			clearInterval(intervalId);
		}
	};

	const onClickRepeat = () => {
		setTimer(new Date('', '', '', '', 25, 0));
		setPomodoroTimer(new Date('', '', '', '', 25, 0));
		setBreaktime(new Date('', '', '', '', 5, 0));
		clearInterval(intervalId);
		setRunning(false);
		setIsBreakTime(false);
	};

	const onClickPlus = (event) => {
		const { target } = event;
		if (!isRunning) {
			if (target.parentNode.classList.value === 'pomodoro') {
				if (pomodoroTimer.getMinutes() >= 1 && pomodoroTimer.getMinutes() * 60 !== 0) {
					setPomodoroTimer(new Date('', '', '', '', pomodoroTimer.getMinutes() + 1, 0));
					setTimer(new Date('', '', '', '', pomodoroTimer.getMinutes() + 1, 0));
				} else if (pomodoroTimer.getHours() === 1) {
					setPomodoroTimer(new Date('', '', '', '', pomodoroTimer.getHours() * 60, 0));
					setTimer(new Date('', '', '', '', pomodoroTimer.getHours() * 60, 0));
				}
			} else if (target.parentNode.classList.value === 'break') {
				if (breakTime.getMinutes() >= 1 && breakTime.getMinutes() * 60 !== 0) {
					setBreaktime(new Date('', '', '', '', breakTime.getMinutes() + 1, 0));
				} else if (breakTime.getHours() === 1) {
					setBreaktime(new Date('', '', '', '', breakTime.getHours() * 60, 0));
				}
			}
		}
	};

	const onClickMinus = (event) => {
		const { target } = event;
		if (!isRunning) {
			if (target.parentNode.classList.value === 'pomodoro') {
				if (pomodoroTimer.getMinutes() * 60 !== 60) {
					setPomodoroTimer(new Date('', '', '', '', pomodoroTimer.getMinutes() - 1, 0));
					setTimer(new Date('', '', '', '', pomodoroTimer.getMinutes() - 1, 0));
				}
			} else if (target.parentNode.classList.value === 'break') {
				if (breakTime.getMinutes() * 60 !== 60) {
					setBreaktime(new Date('', '', '', '', breakTime.getMinutes() - 1, 0));
				}
			}
		}
	};

	useEffect(() => {
		if (timer.getHours() === 1) {
			setMinutes('60');
		} else {
			setMinutes(timer.getMinutes().toLocaleString('pt-BR', {
				minimumIntegerDigits: 2,
			}));
			setSeconds(timer.getSeconds().toLocaleString('pt-BR', {
				minimumIntegerDigits: 2,
			}));
		}
		setTotalSeconds(breakTime.getMinutes() * 60);
	}, [timer]);

	useEffect(() => {
		if (minutes === '00' && seconds === '00' && timer.getSeconds() === 0) {
			if (isBreakTime && isRunning && totalSeconds === 0) {
				clearInterval(intervalId);
				setTimer(new Date('', '', '', '', pomodoroTimer.getMinutes(), 0));
				setIsBreakTime(false);
				setRunning(false);
			} else if (isRunning && !isBreakTime) {
				setIsBreakTime(true);
				return;
			}
		}

		if (startBreak && timer.getMinutes() === 0 && timer.getSeconds() === 0) {
			console.log('aqui----------------------');
			// setRunning(false);
			setIsBreakTime(false);
			if (setPomodoroTimer.getHours === 1) {
				setTimer(new Date('', '', '', '', pomodoroTimer.getHours() * 60, 0));
			} else {
				setTimer(new Date('', '', '', '', pomodoroTimer.getMinutes(), 0));
			}
		}
	}, [minutes, seconds]);

	useEffect(() => {
		if (timer.getTime() === pomodoroTimer.getTime() && isBreakTime) {
			clearInterval(intervalId);
			setTimer(new Date('', '', '', '', pomodoroTimer.getMinutes(), 0));
		}
	}, [isRunning, isBreakTime]);

	useEffect(() => {
		if (isBreakTime) {
			setTimer(new Date(0, '', '', '', breakTime.getMinutes(), 0));
			clearInterval(intervalId);
			setStartBreak(true);
		}
	}, [isBreakTime]);

	useEffect(() => {
		if (startBreak) {
			const runningBreakTime = setInterval(() => {
				timer.setSeconds(timer.getSeconds() - 1);
				setMinutes(timer.getMinutes().toLocaleString('pt-BR', {
					minimumIntegerDigits: 2,
				}));
				setSeconds(timer.getSeconds().toLocaleString('pt-BR', {
					minimumIntegerDigits: 2,
				}));
			}, 50);
			setIntervalId(runningBreakTime);
		}
	}, [startBreak]);

	return (
		<>
			<div className="timerSetter">
				<div>
					<h1 id="session-label">SESSION LENGTH</h1>
					<Screen className="alarmSetter">
						<p id="session-length">
							{pomodoroTimer.getHours() === 1
								? `${pomodoroTimer.getHours() * 60}`
								: `${pomodoroTimer.getMinutes()}`}
						</p>
					</Screen>
					<div className="pomodoro">
						<Button id="session-increment" className="plusMinusButton" onClick={onClickPlus}><FaPlus /></Button>
						<Button id="session-decrement" className="plusMinusButton" onClick={onClickMinus}><FaMinus /></Button>
					</div>
				</div>
				<div>
					<h1 id="break-label">BREAK LENGTH</h1>
					<Screen className="breakSetter">
						<p id="break-length">
							{breakTime.getHours() === 1
								? `${breakTime.getHours() * 60}`
								: `${breakTime.getMinutes()}`}
						</p>
					</Screen>
					<div className="break">
						<Button id="break-increment" className="plusMinusButton" onClick={onClickPlus}><FaPlus /></Button>
						<Button id="break-decrement" className="plusMinusButton" onClick={onClickMinus}><FaMinus /></Button>
					</div>
				</div>
			</div>
			<div className="buttonsSet">
				<Button id="start_stop" className="controllerButton" onClick={onClickPlayPause}>
					<FaPlay />
					<FaPause />
				</Button>
				<Button id="reset" className="controllerButton" onClick={onClickRepeat}><FaReplyAll /></Button>
			</div>
			<div className="timer">
				<Screen className="screenTimer">
					<h2 id="timer-label">{isBreakTime ? 'BREAK' : 'SESSION'}</h2>
					<h1 id="time-left">{`${minutes}:${seconds}`}</h1>
				</Screen>
			</div>
		</>
	);
};

export default Alarm;
