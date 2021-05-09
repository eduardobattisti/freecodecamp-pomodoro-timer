import React from 'react';

import propTypes from 'prop-types';

const Button = (props) => {
	const {
		id, children, className, onClick,
	} = props;

	return (
		<button id={id} type="button" className={className} onClick={onClick}>{children}</button>
	);
};

Button.propTypes = {
	children: propTypes.element.isRequired,
	className: propTypes.string.isRequired,
	onClick: propTypes.func.isRequired,
	id: propTypes.string,
};

Button.defaultProps = {
	id: '',
};

export default Button;
