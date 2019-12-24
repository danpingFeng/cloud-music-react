import React from 'react';
import IconFont from '@/assets/IconFont';

function Loading(params) {
    return (
        <div>
            <IconFont type="iconxingzhuang" />
            拼命加载中...
        </div>
    )
}
export default React.memo(Loading);
