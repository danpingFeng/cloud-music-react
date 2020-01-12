import styles from './index.css';
import router from 'umi/router';
import {useEffect} from 'react';

export default function () {
    // 落地页为推荐页面
    useEffect(() => {
        router.push('/recommend');
    }, []);

    return (
        <div className={styles.normal}>
            content
        </div>
    );
}
