import React, { useState, useEffect, useRef } from 'react';
import {
	FaPlay, FaPause, FaReplyAll, FaPlus, FaMinus,
} from 'react-icons/fa';
import { Button, Screen } from '../../components';

import './style.scss';

const Alarm = () => {
	// States
	const [timer, setTimer] = useState(new Date('', '', '', '', 25, 0));
	const [sessionTime, setSessionTime] = useState(new Date('', '', '', '', 25, 0));
	const [breakTime, setBreakTime] = useState(new Date('', '', '', '', 5, 0));
	const [isBreak, setIsBreak] = useState(false);
	const [isRunning, setIsRunning] = useState(false);
	const zeroTime = useRef(false);
	const lastTime = useRef(null);
	const audioRef = useRef(new Audio());

	const startStopTimer = () => {
		if (!lastTime.current) {
			lastTime.current = setInterval(() => setTimer((currentTime) => {
				const checkDate = new Date(currentTime.getTime() - 1000);
				if (checkDate.getHours() === 23 && checkDate.getSeconds() === 59) {
					zeroTime.current = true;
					return new Date(currentTime.getTime());
				}
				return new Date(currentTime.getTime() - 1000);
			}), 1000);
		} else {
			clearInterval(lastTime.current);
			lastTime.current = null;
		}
	};

	const onClickPlayPause = () => {
		if (!isRunning) {
			startStopTimer();
			setIsRunning(true);
		} else {
			startStopTimer();
			setIsRunning(false);
		}
	};

	// Session Buttons
	const onClickSessionPlus = () => {
		if (!isRunning) {
			if (sessionTime.getHours() === 1) {
				setSessionTime(new Date('', '', '', '', sessionTime.getHours() * 60, 0));
			} else {
				setSessionTime(new Date('', '', '', '', sessionTime.getMinutes() + 1, 0));
			}
		}
	};

	const onClickSessionMinus = () => {
		if (!isRunning) {
			if (sessionTime.getMinutes() > 1 || sessionTime.getHours() === 1) {
				setSessionTime(new Date('', '', '', '', sessionTime.getMinutes() - 1, 0));
			}
		}
	};

	// Break Buttons
	const onClickBreakPlus = () => {
		if (!isRunning) {
			if (breakTime.getHours() === 1) {
				setBreakTime(new Date('', '', '', '', breakTime.getHours() * 60, 0));
			} else {
				setBreakTime(new Date('', '', '', '', breakTime.getMinutes() + 1, 0));
			}
		}
	};

	const onClickBreakMinus = () => {
		if (!isRunning) {
			if (breakTime.getMinutes() > 1 || breakTime.getHours() === 1) {
				setBreakTime(new Date('', '', '', '', breakTime.getMinutes() - 1, 0));
			}
		}
	};

	// Repeat Button
	const onClickRepeat = () => {
		setSessionTime(new Date('', '', '', '', 25, 0));
		setBreakTime(new Date('', '', '', '', 5, 0));
		setTimer(new Date('', '', '', '', 25, 0));
		setIsRunning(false);
		setIsBreak(false);
		audioRef.current.currentTime = 0;
		audioRef.current.pause();
		if (lastTime.current) {
			startStopTimer();
		}
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
		if (zeroTime.current) {
			if (!isBreak && timer.getMinutes() === 0 && timer.getSeconds() === 0 && timer.getHours() === 0) {
				audioRef.current.play();
				setIsBreak(true);
				zeroTime.current = false;
				setTimer(new Date('', '', '', '', breakTime.getMinutes(), 0));
				return;
			}

			if (isBreak && timer.getMinutes() === 0 && timer.getSeconds() === 0 && timer.getHours() === 0) {
				audioRef.current.play();
				setIsBreak(false);
				zeroTime.current = false;
				setTimer(new Date('', '', '', '', sessionTime.getMinutes(), 0));
			}
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
					<h2 id="timer-label">{isBreak ? 'BREAK' : 'SESSION'}</h2>
					<h1 id="time-left">
						{ timer.getHours() === 1
							? `${timer.getHours() * 60}:${timer.getSeconds().toLocaleString('pt-BR', {
								minimumIntegerDigits: 2,
							})}`
							: `${timer.getMinutes().toLocaleString('pt-BR', {
								minimumIntegerDigits: 2,
							})}:${timer.getSeconds().toLocaleString('pt-BR', {
								minimumIntegerDigits: 2,
							})}`}
					</h1>
					<audio
						// eslint-disable-next-line react/jsx-indent-props
						id="beep"
						// eslint-disable-next-line react/jsx-indent-props
						src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
						// eslint-disable-next-line react/jsx-indent-props
						preload="auto"
						// eslint-disable-next-line react/jsx-indent-props
						ref={audioRef}
					/>
				</Screen>
			</div>
		</>
	);
};

export default Alarm;
