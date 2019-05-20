import { connect } from 'vedux';
import { storeUserInfo } from '../../actions/user';
import { fetchAPI } from '../../actions/home';

const pageConfig = {
  data: {
    initDelta: null,
  },
};

const mapStateToData = ({ user, home }) => {
  return {
    userInfo: user.userInfo,
    motto: home.motto,
  };
};
const mapDispatchToPage = dispatch => ({
  storeUserInfo: userInfo => {
    dispatch(storeUserInfo(userInfo));
  },
  fetchAPI: payload => {
    dispatch(fetchAPI(payload));
  },
});

Page(
  connect(
    mapStateToData,
    mapDispatchToPage
  )(pageConfig)
);
