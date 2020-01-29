import React from 'react';
import {connect} from 'dva';

function Player(props) {
    const {dispatch, player} = props;

    return (
        <div>
            player
        </div>
    )
}

export default connect(({player}) => ({player}))(React.memo(Player))
