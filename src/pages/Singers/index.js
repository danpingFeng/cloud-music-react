import React, {useState} from 'react';
import Horizen from '@/components/horizenItem';
import {NavContainer} from './style';
import {categoryTypes, alphaTypes} from '@/config/index';

function Singers() {
    let [category, setCategory] = useState('');
    let [alpha, setAlpha] = useState('');

    let handleUpdateAlpha = val => {
        setAlpha(val);
    }

    let handleUpdateCategory = val => {
        setCategory(val);
    }


    return (
        <NavContainer>
            <Horizen list={categoryTypes} title={"分类(默认热门):"} handleClick={val => handleUpdateCategory(val)} oldVal={category} ></Horizen>
            <Horizen list={alphaTypes} title={"首字母:"} handleClick={val => handleUpdateAlpha(val)} oldVal={alpha} ></Horizen>
        </NavContainer >
    );
}

export default React.memo(Singers)
