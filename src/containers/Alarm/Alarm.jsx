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

	const onClickPlay = () => {
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
		}
	};

	const onClickPause = () => {
		setRunning(false);
		clearInterval(intervalId);
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
				if (pomodoroTimer.getMinutes() > 1 && pomodoroTimer.getMinutes() < 59) {
					setPomodoroTimer(new Date('', '', '', '', pomodoroTimer.getMinutes() + 1, 0));
					setTimer(new Date('', '', '', '', pomodoroTimer.getMinutes() + 1, 0));
				}
			} else if (target.parentNode.classList.value === 'break') {
				if (breakTime.getMinutes() > 1 && breakTime.getMinutes() < 59) {
					setBreaktime(new Date('', '', '', '', breakTime.getMinutes() + 1, 0));
				}
			}
		}
	};

	const onClickMinus = (event) => {
		const { target } = event;
		if (!isRunning) {
			if (target.parentNode.classList.value === 'pomodoro') {
				if (pomodoroTimer.getMinutes() > 1 && pomodoroTimer.getMinutes() < 59) {
					setPomodoroTimer(new Date('', '', '', '', pomodoroTimer.getMinutes() - 1, 0));
					setTimer(new Date('', '', '', '', pomodoroTimer.getMinutes() - 1, 0));
				}
			} else if (target.parentNode.classList.value === 'break') {
				if (breakTime.getMinutes() > 1 && breakTime.getMinutes() < 59) {
					setBreaktime(new Date('', '', '', '', breakTime.getMinutes() - 1, 0));
				}
			}
		}
	};

	useEffect(() => {
		setMinutes(timer.getMinutes().toLocaleString('pt-BR', {
			minimumIntegerDigits: 2,
		}));
		setSeconds(timer.getSeconds().toLocaleString('pt-BR', {
			minimumIntegerDigits: 2,
		}));
		setTotalSeconds(breakTime.getMinutes() * 60);
	}, [timer]);

	useEffect(() => {
		if (minutes === '00' && seconds === '00' && timer.getSeconds() === 0) {
			if (isBreakTime && isRunning && totalSeconds === 0) {
				clearInterval(intervalId);
				setTimer(pomodoroTimer);
				setIsBreakTime(false);
				setRunning(false);
			} else if (isRunning && !isBreakTime) {
				setIsBreakTime(true);
			}
		}

		if (startBreak && timer.getMinutes() === 0 && timer.getSeconds() === 0) {
			onClickRepeat();
		}
	}, [minutes, seconds]);

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
					<h1>SESSION</h1>
					<Screen className="alarmSetter">
						<h3>
							{`${pomodoroTimer.getMinutes().toLocaleString('pt-BR', {
								minimumIntegerDigits: 2,
							})}:${pomodoroTimer.getSeconds().toLocaleString('pt-BR', {
								minimumIntegerDigits: 2,
							})}`}
						</h3>
					</Screen>
					<div className="pomodoro">
						<Button className="plusMinusButton" onClick={onClickPlus}><FaPlus /></Button>
						<Button className="plusMinusButton" onClick={onClickMinus}><FaMinus /></Button>
					</div>
				</div>
				<div>
					<h1>BREAK</h1>
					<Screen className="breakSetter">
						<h3>
							{`${breakTime.getMinutes().toLocaleString('pt-BR', {
								minimumIntegerDigits: 2,
							})}:${breakTime.getSeconds().toLocaleString('pt-BR', {
								minimumIntegerDigits: 2,
							})}`}
						</h3>
					</Screen>
					<div className="break">
						<Button className="plusMinusButton" onClick={onClickPlus}><FaPlus /></Button>
						<Button className="plusMinusButton" onClick={onClickMinus}><FaMinus /></Button>
					</div>
				</div>
			</div>
			<div className="buttonsSet">
				<Button className="controllerButton" onClick={onClickPlay}><FaPlay /></Button>
				<Button className="controllerButton" onClick={onClickPause}><FaPause /></Button>
				<Button className="controllerButton" onClick={onClickRepeat}><FaReplyAll /></Button>
			</div>
			<div className="timer">
				<Screen className="screenTimer">
					<h2>{isBreakTime ? 'BREAK' : 'SESSION'}</h2>
					<h1>{`${minutes}:${seconds}`}</h1>
				</Screen>
			</div>
		</>
	);
};

export default Alarm;
