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
	const [sessionTime, setSessionTime] = useState(new Date('', '', '', '', 25, 0));
	const [breakTime, setBreakTime] = useState(new Date('', '', '', '', 5, 0));
	const [isRunning, setIsRunning] = useState(false);
	// const [intervalId, setIntervalId] = useState(0);
	// const [isBreakTime, setIsBreakTime] = useState(false);

	const onClickPlayPause = () => {
		if (!isRunning) {
			setIsRunning(true);
		} else {
			setIsRunning(false);
		}
	};

	// Session Buttons
	const onClickSessionPlus = () => {
		if (sessionTime.getHours() === 1) {
			setSessionTime(new Date('', '', '', '', sessionTime.getHours() * 60, 0));
		} else {
			setSessionTime(new Date('', '', '', '', sessionTime.getMinutes() + 1, 0));
		}
	};

	const onClickSessionMinus = () => {
		if (sessionTime.getMinutes() > 1 || sessionTime.getHours() === 1) {
			setSessionTime(new Date('', '', '', '', sessionTime.getMinutes() - 1, 0));
		}
	};

	// Break Buttons
	const onClickBreakPlus = () => {
		if (breakTime.getHours() === 1) {
			setBreakTime(new Date('', '', '', '', breakTime.getHours() * 60, 0));
		} else {
			setBreakTime(new Date('', '', '', '', breakTime.getMinutes() + 1, 0));
		}
	};

	const onClickBreakMinus = () => {
		if (breakTime.getMinutes() > 1 || breakTime.getHours() === 1) {
			setBreakTime(new Date('', '', '', '', breakTime.getMinutes() - 1, 0));
		}
	};

	// Repeat Button
	const onClickRepeat = () => {
		// clearInterval(intervalId);
		setTimer(new Date('', '', '', '', 25, 0));
		setSessionTime(new Date('', '', '', '', 25, 0));
		setBreakTime(new Date('', '', '', '', 5, 0));
	};

	useEffect(() => {
		if (!isRunning) {
			if (sessionTime.getHours() === 1) {
				setTimer(new Date('', '', '', '', sessionTime.getHours() * 60, 0));
			} else {
				setTimer(new Date('', '', '', '', sessionTime.getMinutes(), 0));
			}
		}
	}, [sessionTime]);

	useEffect(() => {
		if (sessionTime.getHours() === 1) {
			setMinutes('60');
		} else {
			setMinutes(timer.getMinutes().toLocaleString('pt-BR', {
				minimumIntegerDigits: 2,
			}));
			setSeconds(timer.getSeconds().toLocaleString('pt-BR', {
				minimumIntegerDigits: 2,
			}));
		}
	}, [timer]);

	return (
		<>
			<div className="timerSetter">
				<div>
					<h1 id="session-label">SESSION LENGTH</h1>
					<Screen className="alarmSetter">
						<p id="session-length">
							{sessionTime.getHours() === 1
								? `${sessionTime.getHours() * 60}`
								: `${sessionTime.getMinutes()}`}
						</p>
					</Screen>
					<div className="pomodoro">
						<Button id="session-increment" className="plusMinusButton" onClick={onClickSessionPlus}><FaPlus /></Button>
						<Button id="session-decrement" className="plusMinusButton" onClick={onClickSessionMinus}><FaMinus /></Button>
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
						<Button id="break-increment" className="plusMinusButton" onClick={onClickBreakPlus}><FaPlus /></Button>
						<Button id="break-decrement" className="plusMinusButton" onClick={onClickBreakMinus}><FaMinus /></Button>
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
					<h2 id="timer-label">SESSION</h2>
					<h1 id="time-left">{`${minutes}:${seconds}`}</h1>
				</Screen>
			</div>
		</>
	);
};

export default Alarm;
