import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = theme => ({
    wrapper: {
        height: '100vh',
        width: '100vw',
    },
});

const Container = ({classes,children,style}) => (
    <div className={classes.wrapper} style={style ? style : undefined}>
        {children}
    </div>
);

Container.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
};

export default injectSheet(styles)(Container);