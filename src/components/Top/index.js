import React from 'react';

import styles from './index.less';
// import {Icon} from 'antd';
import IconFont from '@/assets/IconFont';

// const IconFont = Icon.createFromIconfontCN({
//     scriptUrl: '//at.alicdn.com/t/font_1576120_miv0h5o6fsi.js'
// });

function Top(params) {
    return (
        <div className={styles.topWrapper}>
            <span className={styles.item}>
                <IconFont type="iconmenu" />
            </span>
            <span className={styles.item}>网易云音乐</span>
            <span className={styles.item}>
                <IconFont type="icon-search1"></IconFont>
            </span>
        </div>
    )
}

export default React.memo(Top);
