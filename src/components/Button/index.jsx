import React from 'react';

import propTypes from 'prop-types';

const Button = (props) => {
	const { children, className, onClick } = props;

	return (
		<button type="button" className={className} onClick={onClick}>{children}</button>
	);
};

Button.propTypes = {
	children: propTypes.element.isRequired,
	className: propTypes.string.isRequired,
	onClick: propTypes.func.isRequired,
};

export default Button;
