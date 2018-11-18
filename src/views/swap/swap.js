import React from 'react';
import injectSheet from 'react-jss';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Background from '../../components/background';
import View from '../../components/view';
import { LinkButton } from '../../components/button';
import TaskBar from '../../components/taskbar';
import SwapTab from '../../components/swaptab';
import DialogBox from '../../components/dialogbox';

const styles = theme => ({
    wrapper: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    infoWrapper:{
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    title: {
        fontSize: theme.fontSize.sizeXXL,
        color: theme.colors.white,
    },
    description:{
        fontSize: theme.fontSize.sizeXXL,
    }
});

//TODO: refactor into multipe components.
const FirstStep = () => (
    <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <p style={{fontSize: '30px'}}>Paste a <b>Bitcoin</b> lightning invoice of <br/> <b>0.0049 T-BTC</b> to recieve it.</p>
        <p style={{ padding: '50px', wordBreak: 'break-all', whiteSpace: 'normal', width: '600px', height:'100px', color: '#505050', fontSize: '18px', backgroundColor: '#D3D3D3', borderRadius: '3px'}}>
            lnbc1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdpl2pkx2ctnv5
            sxxmmwwd5kgetjypeh2ursdae8g6twvus8g6rfwvs8qun0dfjkxaq8rkx3yf5tcsyz3d73gafnh3cax
            9rn449d9p5uxz9ezhhypd0elx87sjle52x86fux2ypatgddc6k63n7erqz25le42c4u4ecky03ylcqca784w</p>
    </View>
)

const Controls = () => (
    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <FaArrowRight size={40} color={'#FFF'} style={{padding: '10px'}}/>
    </View>
);

const Swap = ({classes, inSwapMode, toggleSwapMode}) => {
    return(
        <Background>
            <TaskBar/>
            {inSwapMode ?
            <View className={classes.wrapper}>
                <DialogBox
                    progressControls={() => <FaArrowLeft size={30} style={{padding: '10px'}} onClick={() => toggleSwapMode()}/>} 
                    content={() => <FirstStep/>}
                    controls={() => <Controls/>}
                /> 
            </View>
                : 
            <View className={classes.wrapper}>
                <View className={classes.infoWrapper}>
                    <p className={classes.title}>Instant, Low fee, & <br/> Non custodial.</p>
                    <p className={classes.description}>
                        Trading <br/>
                        <b>Shouldn't</b><br/>
                        require<br/>
                        an account.
                    </p>
                    <LinkButton text='WHY?' to='/faq'/>
                </View>
                <SwapTab onClick={() => toggleSwapMode()}/>
            </View>
         }           
        </Background>
    );
}

Swap.propTypes= {

}
 
export default injectSheet(styles)(Swap);
