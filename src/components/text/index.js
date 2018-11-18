import React from 'react';
import PropTypes from 'prop-types';
import View from '../view';

// TODO: refactor the generic text types
const Text = ({text, bold, size, style}) => (
    <span style={{fontSize: size ? `${size}px` : '20px', fontWeight: bold ? "500" : "400" , ...style}}>{text}</span>
);

Text.propTypes = {
    text: PropTypes.string.isRequired,
    bold: PropTypes.bool,
    size: PropTypes.number,
    style: PropTypes.object,
};

const InfoText = ({title, text}) => (
    <View style={{flexDirection: 'column'}}>
        <Text text={title} bold={true} size={16}/>
        <Text text={text} size={12}/>
    </View>
);

InfoText.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
};

export default Text;

export {
    InfoText,
};
