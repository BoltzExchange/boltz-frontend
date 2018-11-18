import {connect} from 'react-redux';
import * as actions from './swapActions';
import Swap from './swap';

const mapStateToProps = state => ({
    inSwapMode: state.swapReducer.inSwapMode
}); 

const mapDispatchToProps = dispatch => ({
    toggleSwapMode: () => dispatch(actions.enterSwapMode()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Swap);
