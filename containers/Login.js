import React, { Component, PropTypes } from 'react';

class Nav extends Component {
    constructor(props) {
        super(props);
        

    }

    render() {
        const {profile} = this.props;
        return (
                <div>
                {
                    profile ? <span>signed</span> : <span>sign</span>
                }
            </div>
        );
    }
}


Nav.propTypes = {
    profile: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {profile: state.profile};
}

export default connect(mapStateToProps)(Nav);
