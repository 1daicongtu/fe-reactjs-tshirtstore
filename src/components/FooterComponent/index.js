import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import clsx from 'clsx';
import { Tooltip } from 'react-tooltip';

const Footer = () => {
    return (
        <div>
            <div className={clsx(styles.boxImage)}>
                <img src="https://i.imgur.com/Hc92VcL.png" alt="" />
            </div>
            <div className={styles.container}>
                <p className={styles.titleFooter}>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters
                </p>
            </div>
            <ul className={clsx(styles.listSocialNetwork)}>
                <li className={clsx(styles.itemSocialNetwork)}>
                    <a
                        href="https://twitter.com"
                        data-tooltip-id="tt-twitter-id"
                        data-tooltip-content="Twitter"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    <Tooltip id="tt-twitter-id" place="top" />
                </li>
                <li className={clsx(styles.itemSocialNetwork)}>
                    <a
                        href="https://www.facebook.com/"
                        data-tooltip-id="tt-facebook-id"
                        data-tooltip-content="Facebook"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <Tooltip id="tt-facebook-id" place="top" />
                </li>
                <li className={clsx(styles.itemSocialNetwork)}>
                    <a
                        href="mailto:123@gmail.com"
                        data-tooltip-id="tt-mail-id"
                        data-tooltip-content="Mail"
                    >
                        <i className="fas fa-envelope"></i>
                    </a>
                    <Tooltip id="tt-mail-id" place="top" />
                </li>
                <li className={clsx(styles.itemSocialNetwork)}>
                    <a
                        href="https://www.instagram.com/"
                        data-tooltip-id="tt-ins-id"
                        data-tooltip-content="Instagram"
                    >
                        <i className="fab fa-instagram"></i>
                    </a>
                    <Tooltip id="tt-ins-id" place="top" />
                </li>
            </ul>
            <ul className={clsx(styles.listPolicy)}>
                <li className={clsx(styles.itemPolicy)}>
                    <Link>Privacy & Cookies</Link>
                </li>
                <li className={clsx(styles.itemPolicy)}>
                    <Link>Terms & Conditions</Link>
                </li>
                <li className={clsx(styles.itemPolicy)}>
                    <Link>Accessibility</Link>
                </li>
                <li className={clsx(styles.itemPolicy)}>
                    <Link>About Us</Link>
                </li>
            </ul>
            <p className={clsx(styles.footerCopyright)}>
                © 2022 &nbsp; <strong> Nasatheme</strong>&nbsp; - All Right
                reserved!
            </p>
            <p className={clsx(styles.footerCopyright)}>
                be cloned by Nguyễn Văn Hiếu
            </p>
        </div>
    );
};

export default Footer;
