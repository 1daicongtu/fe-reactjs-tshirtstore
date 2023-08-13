
import clsx from 'clsx'
import styles from './TreePath.module.scss'
import imagePath from '../../assets/elessi-bg2.jpg'
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

const TreePath = ({img, title, listPathTree}) => {
    return (
            <div className={clsx(styles.productDetailPathBox)}>
                <img
                    className={clsx(styles.productImagePath)}
                    src={img ?? imagePath}
                    alt="image-path"
                />
                <div className={clsx(styles.productPathContent)}>
                    <p className={clsx(styles.productName)}>
                        {title}
                    </p>
                    <ul className={clsx(styles.productTreePath)}>
                        {
                            listPathTree.map((item, index) => {
                                
                                return (
                                   
                                        index === 0
                                        ? 
                                        <li
                                            key={index}
                                        >

                                            {
                                                item.link
                                                ? 
                                                <Link
                                                    className={clsx(styles.productPathLink)}
                                                    to={item.link}
                                                >
                                                    {item.name}
                                                </Link>
                                                :
                                                <p className={clsx(styles.productPathLink)}>
                                                    {item.name}
                                                </p>
                                            }
                                            
                                        </li>
                                        :
                                        <Fragment key={index}>
                                            <li
                                                
                                            >
                                                <i
                                                    className={`fa-solid fa-chevron-right ${clsx(
                                                        styles.productPathIcon,
                                                    )}`}
                                                ></i>
                                            </li>
                                            <li
                                               
                                            >
                                            {
                                                item.link
                                                ? 
                                                <Link
                                                    className={clsx(styles.productPathLink)}
                                                    to={item.link}
                                                >
                                                    {item.name}
                                                </Link>
                                                :
                                                <p className={clsx(styles.productPathLink)}>
                                                    {item.name}
                                                </p>
                                            }    
                                            </li>     
                                        </Fragment>

                                )
                            })
                        }
                    
                    </ul>
                </div>
            </div>
    );
};

export default TreePath;