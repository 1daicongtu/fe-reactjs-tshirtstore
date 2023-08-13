import clsx from 'clsx';
import styles from './styleTshirt.module.scss';

const StyleTshirt = ({
    itemSelected,
    productDetailActive,
    setProductDetailActive,
}) => {
    return (
        <>
            <p className={clsx(styles.productStyle)}>
                STYLE: {productDetailActive?.typeName}
            </p>
            <div className={clsx(styles.listProductImageDemo)}>
                {itemSelected &&
                    itemSelected.type?.map((type, index) => {
                        return (
                            <div
                                key={index}
                                className={clsx(
                                    styles.itemProductImageDemo,
                                    type.typeName ===
                                        productDetailActive?.typeName
                                        ? styles.active
                                        : '',
                                )}
                                onClick={() => setProductDetailActive(type)}
                            >
                                <img
                                    src={type.imageSmall?.front}
                                    alt={type.typeName}
                                />
                                <span
                                    className={clsx(
                                        styles.itemProductImageNameValue,
                                    )}
                                >
                                    {type.typeName}
                                </span>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default StyleTshirt;
