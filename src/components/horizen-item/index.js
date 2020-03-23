import React, {useState, useRef, useEffect, memo} from 'react';
import styled from 'styled-components';
import Scroll from '../scroll/index';
import {PropTypes} from 'prop-types';
import style from '../../assets/global-style';

const List = styled.div`
    display: flex;
    align-items: center;
    height: 30px;
    justify-content: center;
    overflow: hidden;
    >span:first-of-type {
        display: block;
        flex: 0 0 auto;
        padding: 5px 0;
        color: grey;
        font-size: ${style["font-size-m"]};
        vertical-align: middle;
    }
`

const ListItem = styled.span`
    flex: 0 0 auto;
    padding: 5px 8px;
    font-size: ${style["font-size-m"]};
    border-radius: 10px;
    &.selected {
        color: ${style["theme-color"]};
        border: 1px solid ${style["theme-color"]};
        opacity: 0.8;
    }
`
// 对scroll进行重新包装，支持横线滚动
function Horizen(props) {
    const [refreshCategoryScroll, setRefreshCategoryScroll] = useState(false);
    const Category = useRef(null);

    const {list, oldVal, title} = props;
    const {handleClick} = props;

    useEffect(() => {
        let categoryDom = Category.current;
        let tagElems = categoryDom.querySelectorAll("span");
        let totalWidth = 0;
        Array.from(tagElems).forEach(ele => {
            totalWidth += ele.offsetWidth;
        });
        totalWidth += 2;
        categoryDom.style.width = `${totalWidth}px`;
        setRefreshCategoryScroll(true);
    }, [refreshCategoryScroll]);

    return (
        <Scroll direction="horizental" refresh={true}>
            <div ref={Category}>
                <List>
                    <span>{title}</span>
                    {
                        list.map(item => {
                            return (
                                <ListItem key={item.key} className={`${oldVal}` === item.key ? 'selected' : ''}
                                    onClick={() => handleClick(item.key)}>
                                    {item.name}
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        </Scroll>
    )
}

// 首先考虑接受的参数
//list 为接受的列表数据
//oldVal 为当前的 item 值
//title 为列表左边的标题
//handleClick 为点击不同的 item 执行的方法
Horizen.defaultProps = {
    list: [],
    handleClick: null
};

Horizen.propTypes = {
    list: PropTypes.array,
    handleClick: PropTypes.func
}
export default memo(Horizen);
