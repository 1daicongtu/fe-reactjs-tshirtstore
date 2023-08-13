import clsx from "clsx";
import styles from "./comparePage.module.scss"
import imageTree from "../../assets/elessi-bg2.jpg"
import { Link } from "react-router-dom";
import configs from "../../config";
import TreePath from "../TreePath";
import { useDispatch, useSelector } from "react-redux";
import convertPriceInt from "../../utils/convertIntPriceToStringPriceDouble";
import { removeItemToCompareList } from "../../redux/slices/compareSlice";


const ComparePage = () => {
    const compareList = useSelector((state) => state.compare.compareList)
    const storeList = useSelector((state) => state.stores.listStore)
    const dispatch = useDispatch()

    return (
        <div className={clsx(styles.comparePage)}>
            <TreePath
                title={"Compare"}
                listPathTree={[
                    {
                        name: "Home",
                        link: configs.routes.homePage,
                    },
                    {
                        name: "Compare",
                        link: null
                    }
                ]}
            />

            <div className={clsx(styles.compareBox)}>
                {
                    compareList.length > 0 
                    ? 
                    <table className={clsx(styles.compareTable)}>
                        <tbody>
                            <tr>
                                <th>
                                    Product
                                </th>
                                {
                                    compareList.length > 0
                                    &&
                                    compareList.map((item, index) => {
                                        return (
                                            <td className={clsx(styles.productCompare)}
                                                key={index}
                                            >
                                                <Link
                                                    to={`/products/${1}`}
                                                >
                
                                                    <img src={item.imageSmall?.[0]?.imgURL} alt="img product"/>
                                                    <p className={clsx(styles.productName)}>
                                                        {item.productName}
                                                    </p>
                                                </Link>
                                            </td>
                                        )
                                    })
                                }
                            
                            </tr>
                            <tr>
                                <th>
                                    Price
                                </th>
                                {
                                    compareList.length > 0
                                    &&
                                    compareList.map((item, index) => {
                                        return (
                                            <td className={clsx(styles.productCompare)}
                                                key={index}
                                            >
                                                <p className={clsx(styles.productCost)}>
                                                    {`$${convertPriceInt(item.costLowest)} - $${convertPriceInt(item.costHighest)}`}
                                                </p>
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                            <tr>
                                <th>
                                    Add to cart
                                </th>
                                {
                                    compareList.length > 0
                                    &&
                                    compareList.map((item, index) => {
                                        return (
                                            <td className={clsx(styles.productCompare)}
                                                key={index}
                                            >
                                                <Link to={`/products/${item.productID}`}>
                                                    <button className={clsx(styles.productAddToCart)}>
                                                        Select options
                                                    </button>
                                                </Link>
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                            <tr>
                                <th>
                                    Description
                                </th>
                                {
                                    compareList.length > 0
                                    &&
                                    compareList.map((item, index) => {
                                        return (
                                            <td className={clsx(styles.productCompare)}
                                                key={index}
                                            >
                                                <p className={clsx(styles.productDescription)}>
                                                    {
                                                        item.descriptionShort
                                                    }
                                                </p>
                                            </td>
                                        )
                                    })
                                }
                            </tr>

                            <tr>
                                <th>
                                    Availability
                                </th>
                                {
                                    compareList.length > 0
                                    &&
                                    compareList.map((item, index) => {
                                        return (
                                            <td className={clsx(styles.productCompare)}>
                                                <p className={clsx(styles.productAvailability, styles.instock)}>
                                                    In stock
                                                </p>
                                            </td>
                                        )
                                    })
                                }
                            </tr>

                            <tr>
                                <th>
                                    Weight
                                </th>
                                {
                                    compareList.length > 0
                                    &&
                                    compareList.map((item, index) => {
                                        return (
                                            <td key={index} className={clsx(styles.productCompare)}>
                                                <p className={clsx(styles.productWeight)}>-</p>
                                            </td>

                                        )
                                    })
                                }
                            </tr>
                            
                            <tr>
                                <th>
                                    Demensions
                                </th>
                                {
                                    compareList.length > 0
                                    &&
                                    compareList.map((item, index) => {
                                        return (
                                            <td key={index} className={clsx(styles.productCompare)}>
                                                <p className={clsx(styles.productShared)}>N/A</p>
                                            </td>

                                        )
                                    })
                                }
                            </tr>
                            <tr>
                                <th>
                                    Sku
                                </th>
                                {
                                    compareList.length > 0
                                    &&
                                    compareList.map((item, index) => {
                                        return (
                                            <td key={index} className={clsx(styles.productCompare)}>
                                                <p className={clsx(styles.productShared)}>{item.SKU}</p>
                                            </td>

                                        )
                                    })
                                }
                            </tr>
                            
                            <tr>
                                <th>
                                    Style
                                </th>
                                {
                                    compareList.length > 0
                                    &&
                                    compareList.map((item, index) => {
                                        return (
                                            <td key={index} className={clsx(styles.productCompare)}>
                                                <p className={clsx(styles.productShared)}>
                                                    {item.category.join(", ")}
                                                </p>
                                            </td>

                                        )
                                    })
                                }
                            </tr>

                            <tr>
                                <th>
                                    T-shirt Brand
                                </th>
                                {
                                    compareList.length > 0
                                    &&
                                    compareList.map((item, index) => {
                                        return (
                                            <td key={index} className={clsx(styles.productCompare)}>
                                                <p className={clsx(styles.productShared)}>
                                                    {
                                                        storeList.find(store => store.idStore === item.storeID)?.storeName
                                                    }
                                                </p>
                                            </td>

                                        )
                                    })
                                }
                            </tr>
                            <tr>
                                <th>
                                    
                                </th>
                                {
                                    compareList.length > 0
                                    &&
                                    compareList.map((item, index) => {
                                        return (
                                            <td key={index} className={clsx(styles.productCompare)}>
                                                <button className={clsx(styles.btnRemoveItem)}
                                                    onClick={() => dispatch(removeItemToCompareList(item.productID))}
                                                >
                                                    Remove
                                                </button>
                                            </td>

                                        )
                                    })
                                }
                            </tr>
                        </tbody>
                    </table>
                    :
                    <div className={clsx(styles.emptyComapre)}>
                        <i className={`fa-solid fa-rotate ${clsx(styles.iconEmpty)}`}></i>
                        <p className={clsx(styles.emptyComapreText)}>
                            No product added to compare!
                        </p>

                        <Link to={configs.routes.homePage}>
                            <button className={clsx(styles.btnEmptyCompare)}>
                                Return to shop
                            </button>
                        </Link>
                    </div>
                }
               

            </div>
        </div>
    );
};

export default ComparePage;