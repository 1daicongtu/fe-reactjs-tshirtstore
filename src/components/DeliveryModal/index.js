
import clsx from "clsx";
import styles from "./DeliveryModal.module.scss"


const DeliveryModal = (
    {
        setTabServicesActive,
        tabServicesActive,
        keyTab
    }
) => {
    return (
        <div className={clsx(styles.modal, keyTab=== tabServicesActive ? styles.activeModal : "")}
            onClick={()=>setTabServicesActive(0)}   
        >
            <div className={clsx(styles.modalBox, keyTab=== tabServicesActive ? styles.activeModal : "")}
                onClick={(e)=>e.stopPropagation()}
            >
                <div className={styles.modalBoxDetail}>
                    <div className={styles.modalHeader}>
                        <i className={`fa-solid fa-xmark ${styles.modalClose}`}
                            onClick={()=>setTabServicesActive(0)}
                        ></i>
                    </div>
                    <div className={styles.modalBody}>
                        <div className="">
                            <h1 className={clsx(styles.modalBodyTitle)}>Return</h1>
                            <p className={clsx(styles.modalBodyDesc)}>
                                Elessi will accept exchanges and returns of unworn and unwashed garments within 30 days of the date of purchase (14 days during the sales period), on presentation of the original till receipt at any store where the corresponding collection is available within the country of purchase.
                                <br/>
                                <br/>
                                Your return will usually be processed within a week to a week and a half. We’ll send you a Return Notification email to notify you once the return has been completed.
                                Please allow 1-3 business days for refunds to be received to the original form of payment once the return has been processed.
                            </p>
                        </div>
                        <div className="">
                            <h1 className={clsx(styles.modalBodyTitle)}>Help</h1>
                            <p className={clsx(styles.modalBodyDesc)}>
                                Give us a shout if you have any other questions and/or concerns.
                            </p>

                            <p className={clsx(styles.modalBodyDesc)}>Email: 
                                <a href="mailto:contact@mydomain.com"
                                    className={clsx(styles.modalBodyDescLink)}
                                >contact@mydomain.com</a>
                            </p>

                            <p className={clsx(styles.modalBodyDesc)}>Phone: +1 (23) 456 789</p>
                    


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryModal;