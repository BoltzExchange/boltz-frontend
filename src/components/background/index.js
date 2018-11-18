import React from 'react';
import PropTypes from 'prop-types';
import View from '../view';
import injectSheet from 'react-jss';

const styles = theme => ({
    wrapper: {
        backgroundImage: 'linear-gradient(to bottom, #134357, #45587d, #846995, #c1799a, #ef9391)',
        flexDirection: 'column',
    }
});

const Background = ({classes, children }) => (
    <View className={classes.wrapper} style={{height: '100vh', width: '100vw'}}>
        {children}
    </View>
);

Background.propTypes = {
    children: PropTypes.node,
}

export default injectSheet(styles)(Background); 
