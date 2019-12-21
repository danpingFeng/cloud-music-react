import React from 'react';
import {Icon} from 'antd';
import styles from './index.less';
// import IconFont from '../../assets/IconFont';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1576120_miv0h5o6fsi.js',   //阿里巴巴图标引用地址
    // scriptUrl: 'https://at.alicdn.com/t/font_1576120_dzoxyrpn9dg.js'
});

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
