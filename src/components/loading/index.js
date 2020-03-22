import React from 'react';
import IconFont from '@/assets/IconFont';
import {LoadingWrapper} from './style'

function Loading(params) {
    return (
        <LoadingWrapper>
            <IconFont type="iconxingzhuang" />
            <span>
                拼命加载中...
            </span>
        </LoadingWrapper>
    )
}
export default React.memo(Loading);
