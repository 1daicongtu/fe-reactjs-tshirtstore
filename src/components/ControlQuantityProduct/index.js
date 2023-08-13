import styles from './ControlQuantityProduct.module.scss';
import clsx from 'clsx';

const ControlQuantityProduct = ({ quantity, setQuantity }) => {
    const handleChangeQuantity = (e) => {
        if (e.target.value.trim() === ""){
            setQuantity("")
            return;
        }
        if (!parseInt(e.target.value)){
            return;
        }
        setQuantity(parseInt(e.target.value).toString());
    };

    return (
        <div className={clsx(styles.productBtnControlGroup)}>
            <div className={clsx(styles.btnControlQuantity)}>
                <input
                    type="text"
                    className={clsx(styles.inputQuantityProduct)}
                    value={quantity}
                    onChange={handleChangeQuantity}
                />
                <div className={clsx(styles.boxModifiedQuantity)}>
                    <button
                        className={clsx(
                            styles.btnChangeQuantityProduct,
                            styles.btnIncreaseQuantity,
                        )}
                        onClick={() => setQuantity((quantity-0) + 1)}
                    >
                        <i className="fa-solid fa-angle-up"></i>
                    </button>
                    <button
                        className={clsx(
                            styles.btnChangeQuantityProduct,
                            styles.btnDescreaseQuantity,
                        )}
                        onClick={() => {
                            if (quantity > 1) setQuantity(quantity - 1);
                        }}
                    >
                        <i className="fa-solid fa-angle-down"></i>
                    </button>
                </div>
            </div>
            <button className={clsx(styles.btnControlAddToCart)}>
                ADD TO CART
            </button>
            <button className={clsx(styles.btnControlBuyNow)}>BUY NOW</button>
        </div>
    );
};

export default ControlQuantityProduct;
