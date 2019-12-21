import React from 'react';
// import Link from 'umi/link';
import NabLink from 'umi/navlink';

import styles from './index.less';

function Tab(params) {
    return (
        <div className={styles.tabWrapper}>
            <NabLink to="/Recommend" activeClassName={styles.selected}>推荐</NabLink>
            <NabLink to="/Singers" activeClassName={styles.selected}>歌手</NabLink>
            <NabLink to="/Rank" activeClassName={styles.selected}>排行</NabLink>
        </div>
    )
}

export default React.memo(Tab);