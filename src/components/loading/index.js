import React from 'react';

import {Icon} from 'antd';
// import IconFont from '@/assets/IconFont';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1576120_koiklnjmlm.js'
});

function Loading(params) {
    return (
        <div>
            <IconFont type="iconxingzhuang" />
            拼命加载中...
        </div>
    )
}

export default React.memo(Loading);
