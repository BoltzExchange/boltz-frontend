import React from 'react'
import PropTypes from 'prop-types';

const View = ({children,style,className,...otherProps}) => {
    let newStyle = {
        display: otherProps.noFlex ? 'inline' : 'flex',
    };
    if(style !== undefined){
        newStyle = {...newStyle,...style}
    }
    return(
        <div className={className} style={newStyle} {...otherProps}>
            {children}
        </div>
    )
}

View.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
    otherProps: PropTypes.array,
}

export default View;
