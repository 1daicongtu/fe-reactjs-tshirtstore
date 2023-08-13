import { Link } from 'react-router-dom';
import Header from '../../HeaderComponent/Header';
import PopupProductQuickView from '../../PopupProductQuickView';
import FeatureItems from '../FeatureItems';
import RecommendForYou from '../RecommendForYou';
import SliderComponent from '../SliderComponent';
import styles from './HomeComponent.module.scss';
import clsx from 'clsx';
import Footer from '../../FooterComponent';
import ListServicesDemo from '../ListServicesDemo';
import { addToastMessage } from '../../HeaderComponent/ToastMessage';

const Home = () => {
    return (
        <>
            <SliderComponent />
            <RecommendForYou />
            <div className={`${clsx(styles.container)}`}>
                <div className={`row g-0 ${styles.listItemIntroduct}`}>
                    <div
                        className={`col-12 col-md-4 col-lg-4 ${styles.itemIntroduct}`}
                    >
                        <div className={clsx(styles.boxImage)}>
                            <img
                                src="https://i.imgur.com/cB1lh5Z.jpg"
                                alt="anh1"
                            />
                        </div>
                        <div className={clsx(styles.itemIntroductContent)}>
                            <p className={clsx(styles.titleIntroductProduct)}>
                                Bag with rose pattern
                            </p>
                            <p className={clsx(styles.onSale)}>Sale of 25%</p>
                            <Link className={clsx(styles.linkShopNow)} to="/">
                                Shop now
                            </Link>
                        </div>
                    </div>
                    <div
                        className={`col-12 col-md-4 col-lg-4 ${styles.itemIntroduct}`}
                    >
                        <div className={clsx(styles.boxImage)}>
                            <img
                                src="https://i.imgur.com/apaWAIx.jpg"
                                alt="anh1"
                            />
                        </div>
                        <div className={clsx(styles.itemIntroductContent)}
                            onClick={() => {addToastMessage({title: "aaaa", message: "bbbb", type: "success"})}}
                        >
                            <p className={clsx(styles.titleIntroductProduct)}>
                                Hello Summer
                            </p>
                            <Link className={clsx(styles.linkShopNow)} to="/">
                                Shop now
                            </Link>
                        </div>
                    </div>
                    <div
                        className={`col-12 col-md-4 col-lg-4 ${styles.itemIntroduct}`}
                    >
                        <div className={clsx(styles.boxImage)}>
                            <img
                                src="https://i.imgur.com/4imMLq9.jpg"
                                alt="anh1"
                            />
                        </div>
                        <div className={clsx(styles.itemIntroductContent)}>
                            <p className={clsx(styles.titleIntroductProduct)}>
                                Let's Party Hard Pilow
                            </p>

                            <Link className={clsx(styles.linkShopNow)} to="/">
                                Shop now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <FeatureItems 
                title = {"Featured Items"}
                description = {"Find a bright ideal to suit your taste with our great selection of suspension, wall, floor and table light"}
                itemShow={3}
            />
            <div className={clsx(styles.bannerSaleOffNewDesign)}>
                <img src="https://i.imgur.com/qnEjqjT.jpg" alt="banner 1" />
                <div className={clsx(styles.containerBannerNewDesign)}>
                    <p className={clsx(styles.bannerDesignName)}>NEW DESIGN</p>
                    <p className={clsx(styles.bannerConntent)}>
                        Up to <span>50% Off</span> <br /> All T-Shirt &
                        Accessories
                    </p>
                    <Link
                        to="/"
                        className={clsx(styles.shopnowLinkBannerDesign)}
                    >
                        Shop now
                    </Link>
                </div>
            </div>
            <div className={clsx(styles.container)}>
                <ListServicesDemo/>
            </div>
            
        </>
    );
};

export default Home;
