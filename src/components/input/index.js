import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = theme => ({
    wrapper:{
        textAlign: 'center',
        fontSize: theme.fontSize.sizeM,
        border: 'none',
        borderRadius: '2px',
        margin: '5px',
        backgroundColor: theme.colors.lightGrey,
        width: '200px',
        height: '50px',
        '&:focus': {
            outline: 'none',
        }
    }
});


class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: 0};
    }

    onChange = (e) => {
        if (e.target.value >= 0) {
            this.setState({text: e.target.value});
        }
    }

    render () {
        const { classes, isText, style} = this.props;
        return (
            <input 
                min="0"
                style={style ? style : undefined}
                className={classes.wrapper}
                onChange={(e) => this.onChange(e)}
                autoComplete = {false}
                type={isText ? 'text' : 'number'}
            />
        )
    }
}

Input.propTypes = {
    isText: PropTypes.bool,
}

export default injectSheet(styles)(Input);
