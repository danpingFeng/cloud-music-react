import React, {useState, useRef, useEffect, memo} from 'react';
import styled from 'styled-components';
import Scroll from '../Scroll/index';
import style from '../../assets/global-style';

const List = styled.div`
    display: flex;
    align-items: center;
    height: 30px;
    overflow: hidden;

    .title {
        display: block;
        flex: 0 0 auto;
        padding: 5px 0;
        margin-right: 5px;
        color: grey;
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


function Horizen(props) {
    const {list, oldVal, title} = props;
    const {handleClick} = props;
    const Category = useRef(null);
    useEffect(() => {
        let categoryDom = Category.current;
        let tagElems = categoryDom.querySelectorAll("span");
        let totalWidth = 0;
        Array.from(tagElems).forEach(ele => {
            totalWidth += ele.offsetWidth;
        });
        categoryDom.style.width = `${totalWidth}px`;
    }, [])

    return (
        <Scroll direction="horizental">
            <div ref={Category}>
                <List>
                    <span className="title">{title}</span>
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
    // list: PropTypes.array,
    // handleClick: PropTypes.func
}
export default React.memo(Horizen);
