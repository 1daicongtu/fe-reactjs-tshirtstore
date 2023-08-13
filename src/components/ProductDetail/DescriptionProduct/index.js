import clsx from "clsx";
import styles from "./DescriptionProduct.module.scss"
import descriptionImg from "../../../assets/product-desc-pin3.jpg"
import { Tooltip } from "react-tooltip";


const DescriptionProduct = () => {
    return (
        <div className={styles.descriptionProduct}> 
            <p className={styles.descriptionProductTitle}>
                The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire.
                <br/>
                <br/>
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

            <div className={styles.descriptionImg}>
                <img src={descriptionImg} alt="product description" />

                <div className={clsx(styles.stylesItemMark, styles.shoulderPosition)}
                     data-tooltip-id="shoulderPosition" data-tooltip-content="Fabrics Waistband"

                >
                    <span className={clsx( styles.positionImg)}>
                        <i className="fa-solid fa-plus"></i>
                    </span>
                    <span className={clsx(styles.positionScale)}></span>   
                          
                </div>
                <Tooltip id="shoulderPosition" place="right"></Tooltip>         
                <div className={clsx(styles.stylesItemMark, styles.handPosition)}
                    data-tooltip-id="shoulderPosition" data-tooltip-content="Fabrics Silk"
                >
                    <span className={clsx( styles.positionImg)}>
                        <i className="fa-solid fa-plus"></i>
                    </span>
                    <span className={clsx(styles.positionScale)}></span>
                </div>
                <Tooltip id="handPosition" place="top"></Tooltip>        
                <div className={clsx(styles.stylesItemMark, styles.elbowPosition)}
                    data-tooltip-id="elbowPosition" data-tooltip-content="Magic Pocket"
                >
                    <span className={clsx( styles.positionImg)}>
                        <i className="fa-solid fa-plus"></i>
                    </span>
                    <span className={clsx(styles.positionScale)}></span>                    
                </div>
                <Tooltip id="elbowPosition" place="left"></Tooltip>      
            </div>
        </div>
    );
};

export default DescriptionProduct;