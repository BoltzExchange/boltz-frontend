import { connect } from 'react-redux';
import Router from './Router';

const mapStateToProps = state => ({
  route: state.route,
});

export default connect(mapStateToProps)(Router);
