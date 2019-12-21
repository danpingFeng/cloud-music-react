import React from 'react';
import styles from './index.less';

import Top from '../components/Top';
import Tab from '../components/Tab';

// 全局路由
function BasicLayout(props) {
    return (
        <div className={styles.normal}>
            <Top></Top>
            <Tab></Tab>
            {props.children}
        </div>
    );
}

export default React.memo(BasicLayout);
