import { connect } from 'react-redux';
import Root from './root';

const mapStateToProps = state => ({
  route: state.route,
});

export default connect(mapStateToProps)(Root);
