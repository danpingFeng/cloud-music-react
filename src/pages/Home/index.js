import React from 'react';

function Home(props) {
    return (
        <div>
            Home
            {props.children}
        </div>
    )
}

export default React.memo(Home)