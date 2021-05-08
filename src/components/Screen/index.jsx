import React from 'react';

import propTypes from 'prop-types';

const Screen = (props) => {
	const { className, children } = props;

	return (
		<div className={className}>{children}</div>
	);
};

Screen.propTypes = {
	className: propTypes.string.isRequired,
	children: propTypes.element.isRequired,
};

export default Screen;
