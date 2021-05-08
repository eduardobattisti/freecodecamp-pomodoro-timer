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
	const [breakTime, setBreaktime] = useState(new Date('', '', '', '', 5, 0));
	const [pomodoroTimer, setPomodoroTimer] = useState(new Date('', '', '', '', 25, 0));

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
			}, 1000);
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
		clearInterval(intervalId);
		setRunning(false);
	};

	const onClickPlus = (event) => {
		const { target } = event;
		if (!isRunning) {
			if (target.parentNode.classList.value === 'pomodoro') {
				setPomodoroTimer(new Date('', '', '', '', pomodoroTimer.getMinutes() + 1, 0));
			} else if (target.parentNode.classList.value === 'break') {
				setBreaktime(new Date('', '', '', '', breakTime.getMinutes() + 1, 0));
			}
		}
	};

	const onClickMinus = (event) => {
		const { target } = event;
		if (!isRunning) {
			if (target.parentNode.classList.value === 'pomodoro') {
				setPomodoroTimer(new Date('', '', '', '', pomodoroTimer.getMinutes() - 1, 0));
			} else if (target.parentNode.classList.value === 'break') {
				setBreaktime(new Date('', '', '', '', breakTime.getMinutes() - 1, 0));
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
	}, [timer]);

	return (
		<>
			<div className="timerSetter">
				<div>
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
					<h1>{`${minutes}:${seconds}`}</h1>
				</Screen>
			</div>
		</>
	);
};

export default Alarm;
