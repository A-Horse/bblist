import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import {fetchProfile} from '../actions/profile';

class Nav extends Component {
    constructor(props) {
        super(props);
        
        const { dispatch, selectedReddit } = this.props
        dispatch(fetchProfile())
    }

    render() {
        const {profileByServer} = this.props;
        
        console.log('profileByServer', !!profileByServer.profile);
        let s;
        if(!!profileByServer.profile) {
            s = <span>signed</span>;
        } else {
            s = <span>sign</span>;
        }
        
        return (
            <div>
              { s }
            </div>
        );
    }
}


Nav.propTypes = {
    profileByServer: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {profileByServer: state.profileByServer || {}};
}

export default connect(mapStateToProps)(Nav);
