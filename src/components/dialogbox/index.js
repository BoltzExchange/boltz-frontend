import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import ProgressBar from '../progressbar';

const styles = theme => ({
    wrapper: {
        height: '600px',
        width: '900px',
        boxShadow: '0px 0px 30px -6px rgba(0,0,0,0.52)',
        backgroundColor: theme.colors.white,
        flexDirection: 'column',
    },
    progress: {
        width: '100%',
        height: '10%',
        backgroundColor: theme.colors.white,
        alignItems: 'center',
    },
    content: {
        width: '100%',
        height: '75%',
    },
    controls: {
        width: '100%',
        height: '15%',
        backgroundColor: theme.colors.matisseBlue,
    }
});

const DialogBox = ({classes, progressControls, content, controls}) => (
    <View className={classes.wrapper}>
        <View className={classes.progress}>
            {progressControls ? progressControls() : null}
            <ProgressBar progress={25}/>
        </View>
        <View className={classes.content}>{content()}</View>
        <View className={classes.controls}>{controls()}</View>
    </View>
);

DialogBox.propTypes = {
    progressControls: PropTypes.func,
    content: PropTypes.func.isRequired, 
    controls: PropTypes.func.isRequired,
}

export default injectSheet(styles)(DialogBox);
