import clsx from "clsx";
import styles from "./ListServicesDemo.module.scss"

const ListServicesDemo = () => {
    return (
        <div className={`g-0 row ${styles.listServices}`}>
                    <div
                        className={`col-12 col-md-6 col-lg-3 ${styles.boxItemServices}`}
                    >
                        <div className={clsx(styles.itemServices)}>
                            <h1 className={clsx(styles.titleService)}>
                                FREE Shiping
                            </h1>
                            <p className={clsx(styles.contentServices)}>
                                Free shipping for all US order
                            </p>
                            <i
                                className={`fa-solid fa-plane ${styles.iconServices}`}
                            ></i>
                        </div>
                    </div>
                    <div
                        className={`col-12 col-md-6 col-lg-3 ${styles.boxItemServices}`}
                    >
                        <div className={clsx(styles.itemServices)}>
                            <h1 className={clsx(styles.titleService)}>
                                SUPPORT 24/7
                            </h1>
                            <p className={clsx(styles.contentServices)}>
                                We support 24 hours a day
                            </p>
                            <i
                                className={`fa-solid fa-headphones-simple ${styles.iconServices}`}
                            ></i>
                        </div>
                    </div>
                    <div
                        className={`col-12 col-md-6 col-lg-3 ${styles.boxItemServices}`}
                    >
                        <div className={clsx(styles.itemServices)}>
                            <h1 className={clsx(styles.titleService)}>
                                100% MONEY BACK
                            </h1>
                            <p className={clsx(styles.contentServices)}>
                                You have 30 days to return
                            </p>
                            <i
                                className={`fa-solid fa-arrows-rotate ${styles.iconServices}`}
                            ></i>
                        </div>
                    </div>
                    <div
                        className={`col-12 col-md-6 col-lg-3 ${styles.boxItemServices}`}
                    >
                        <div className={clsx(styles.itemServices)}>
                            <h1 className={clsx(styles.titleService)}>
                                PAYMENT SECURE
                            </h1>
                            <p className={clsx(styles.contentServices)}>
                                We ensure secure payment
                            </p>
                            <i
                                className={`fa-solid fa-gift ${styles.iconServices}`}
                            ></i>
                        </div>
                    </div>
                </div>
    );
};

export default ListServicesDemo;