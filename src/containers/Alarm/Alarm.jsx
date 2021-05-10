import React, { useState } from 'react';
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
	const [sessionTime, setSessionTime] = useState('', '', '', '', 25, 0);
	const [breakTime, setBreakTime] = useState('', '', '', '', 5, 0);
	const [isRunning, setIsRunning] = useState(false);
	const [intervalId, setIntervalId] = useState(0);
	// const [isBreakTime, setIsBreakTime] = useState(false);

	onClickPlayPause = () => {
		if (!isRunning) {
			const runningTime = setInterval(() => {
				setTimer(new Date('', '', '', '', '', timer.getSeconds() - 1));
			}, 50);
			setIntervalId(runningTime);
		} else {
			clearInteval(intervalId);
			setIsRunning(true);
		}
	};

	onClickSessionPlus = () => {
		setSessionTime(new Date('', '', '', '', sessionTime.getMinutes() + 1, 0));
	};

	onClickSessionMinus = () => {
		setSessionTime(new Date('', '', '', '', sessionTime.getMinutes() - 1, 0));
	};

	onClickBreakPlus = () => {
		setBreakTime(new Date('', '', '', '', breakTime.getMinutes() + 1, 0));
	};

	onClickBreakMinus = () => {
		setBreakTime(new Date('', '', '', '', breakTime.getMinutes() - 1, 0));
	};

	useEffect(() => {
		if (!isRunning) {
			setTimer(new Date('', '', '', '', sessionTime.getMinutes(), 0));
		}
	}, [sessionTime]);

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
