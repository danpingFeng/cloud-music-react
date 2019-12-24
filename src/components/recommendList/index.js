import React from 'react'
import styles from './index.less'
import {getCount} from '@/utils/utils'
// import IconFont from '@/assets/IconFont';
import LazyLoad from 'react-lazyload';
import {Icon} from 'antd';
// import IconFont from '@/assets/IconFont';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1576120_rxiajctro5j.js'
});

function recommendList(props) {
    const {recommendList} = props;

    return (
        <>
            <h1 className={styles.title}>推荐歌单</h1>
            <div className={styles.listWrapper}>
                {
                    recommendList.map((item, index) => {
                        return (
                            <div className={styles.itemWrapper} key={item.id + index} >
                                <div className={styles.imgWrapper}>
                                    {/* decorate: 用来给给图片上的图标和文字提供一个遮罩，因为在字体颜色是白色，在面对白色图片背景的时候，文字会看不清或者看不到，因此提供一个阴影来衬托出文字 */}
                                    <div className={styles.decorate}></div>
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music" />}>
                                        <img src={item.picUrl + "?param=300*300"} width="100%" height="10%" alt="" />
                                    </LazyLoad>

                                </div>

                                <div className={styles.playCount}>
                                    <IconFont type="iconerji2"></IconFont>
                                    <span className="count">{getCount(item.playCount)}</span>
                                </div>
                                <div className={styles.desc}>{item.name}</div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default React.memo(recommendList)