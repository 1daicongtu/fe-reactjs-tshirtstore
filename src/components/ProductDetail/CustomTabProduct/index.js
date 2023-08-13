import clsx from "clsx";
import styles from "./CustomTabProduct.module.scss"
import servicesImg from "../../../assets/support-service2.jpg"
import { Link } from "react-router-dom";

const CustomTabProduct = () => {
    return (
        <div className={clsx(styles.customerTabProduct)}>
            <div className={clsx(styles.customerTabHeader)}>
                <h1 className={clsx(styles.customTabTitle)}>Used for all products of this categories</h1>
                <p className={clsx(styles.customTabContent)}>
                If issues experienced with the frame include a manufacturer's defect, or an issue resulting from an inherent flaw in the product, we provides a 365 days warranty from the time of purchase. If you feel your product meets these requirements, please email 
                    <a href="mailto:elessi@domain.com">elessi@domain.com</a>
                explaining the nature of your warranty claim and all necessary details.
                </p>
            </div>
            <div className={`row ${clsx(styles.customerTabBody)}`}>
                <div className={`col-xs-12 col-md-6 col-lg-6`}>
                    <img src={servicesImg} alt="img services" />
                </div>
                <div className={`col-xs-12 col-md-6 col-lg-6`}>
                    <h2 className={clsx(styles.customTabTitleDetail)}>Repair and Service</h2>
                    <p className={clsx(styles.customTabContentDetail)}>
                        We believe in crafting pieces where sustainability and style go hand in hand. Made from materials like recycled cashmere and sust
                    </p>
                    <Link to="/" className={styles.customTabLink}>Read more</Link>
                </div>
            </div>
        </div>
    );
};

export default CustomTabProduct;