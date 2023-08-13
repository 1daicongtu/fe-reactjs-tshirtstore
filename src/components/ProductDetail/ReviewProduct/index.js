import clsx from "clsx";
import styles from "./ReviewProduct.module.scss"
import { useRef, useState } from "react";
import { ref } from "yup";
import {useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

const validFileExtensions = { image: ['jpg', 'png', 'jpeg'] };

function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

const validate = yup.object().shape({
    reviewName: yup.string().required("Vui lòng nhập tên"),
    reviewEmail: yup.string().required("Vui lòng nhập email").email("Email không hợp lệ"),
    reviewContent: yup.string().required("Vui lòng nhập nội dung"),
    imgReview: yup.mixed().test("is-valid-type", "Vui lòng chọn file ảnh", (value)=> {
        
        if (value.length === 0) return true;
        let flag = true;
        const newValue = Array.from(value);
        newValue.length > 0 && newValue.forEach((file) => {
            if (!isValidFileType(file.name.toLowerCase(), "image")) {
                flag = false;
            }
        })

        return flag;
    })
})

const ReviewProduct = ({product}) => {
    const [starVote, setStarVote] = useState(5);
    
    const refStar = useRef(5)

    const {register, handleSubmit, formState: { errors, isValid }} = useForm({
        mode: "onChange",
        resolver: yupResolver(validate)
    });

    const handleSubmitForm = (data) => {
        if (isValid){
            console.log(data)
        }
    }

    return (
        <div className={clsx(styles.reviewProduct)}>
            <div className={` row `}>
                <div className={`col col-xs-12 col-md-6 col-lg-6`}>
                    <p className={clsx(styles.reivewProductTitle)}>Based On 0 Reviews</p>

                    <p className={clsx(styles.reviewAvgReview)}>
                        0.00
                        <span className={clsx(styles.reviewAvgReviewTitle)}>Overall</span>
                    </p>

                    <div className={clsx(styles.reviewProductRatingList)}>
                        {
                            Array(5).fill().map((v1,index)=>{
                                return (
                                    <div
                                        key={index}
                                        className={clsx(styles.reviewProductRatingItem)}
                                    >
                                        <div className={clsx(styles.reviewProductStar)}>
                                            {
                                                Array(5).fill().map((v2, index2)=>{

                                                        if (index2 < 5-index){
                                                            return (
                                                                <i
                                                                    key={index2}
                                                                className={`fa-solid fa-star ${styles.productIconStarSolids}`}></i>
                                                            )
                                                        }
                                                            return (
                                                                <i
                                                                    key={index2}
                                                                className={`fa-regular fa-star ${styles.productIconStarRegulars}`}></i>
                                                            )
                                                       
                                                })  
                                            }
                                        </div>
                                        <div className={clsx(styles.reviewProductRating)}>
                                            
                                            <div className={clsx(styles.reviewProductRatingProgress, styles.reviewProductGood)} style={{width: "22%"}}>
                                            </div>
                                        </div>
                                        <p className={clsx(styles.reviewProductPercentage)}>0%</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={`col col-xs-12 col-md-6 col-lg-6`}>
                    <p className={clsx(styles.reivewProductTitle)}>Be The First To Review “Rayshard Brooks”</p>

                    <form action="" method="POST"
                        onSubmit={handleSubmit(handleSubmitForm)}
                    >
                        <p className={clsx(styles.labelRating)}>
                            Your email address will not be published. Required fields are marked 
                            <span className={styles.redRequired}>*</span>
                        </p>
                        <div className={clsx(styles.yourRating)}>
                            <p className={clsx(styles.labelRating, styles.labelFormReview)}>Your rating:</p>
                            <div className={clsx(styles.ratingFormList)}>
                                {
                                    Array(5).fill().map((v1,index)=>{
                                        if (index+1 <= starVote){
                                            return (
                                                <i 
                                                    key={index}
                                                    className={`fa-solid fa-star ${clsx(styles.productIconStarSolid, styles.active)}`}
                                                    onClick={()=>{ 
                                                        setStarVote(index+1)
                                                        refStar.current = starVote
                                                    }}
                                                    onMouseEnter={()=>{
                                                        setStarVote(index+1)
                                                       
                                                    }}
                                                    onMouseOut={()=>{
                                                        setStarVote(refStar.current)
                                                    }}
                                                ></i>
                                            )
                                            
                                        } 
                                        return (
                                            <i 
                                                className={`fa-solid fa-star ${styles.productIconStarSolid}`}
                                                onClick={()=>{
                                                        
                                                    setStarVote(index+1)
                                                    refStar.current = starVote
                                                }}
                                                onMouseEnter={()=>{
                                                    setStarVote(index+1)
                                                    
                                                }}
                                                onMouseOut={()=>{
                                                    setStarVote(refStar.current)
                                                }}
                                            ></i>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={`${clsx(styles.rowForm)} row`}>
                            <div className={`col col-xs-12 col-md-12 col-lg-12 ${clsx(styles.reviewFormGroup)}`}>
                                <label htmlFor="reviewContent" className={clsx(styles.labelRating, styles.labelFormReview)}>Your review <span className={styles.redRequired}>*</span></label>
                                <textarea id="reviewContent" cols="30" rows="5" 
                                    {...register("reviewContent")}
                                    placeholder="Your review"
                                    className={clsx(styles.reviewInputForm)}>
                                    
                                </textarea>
                                {errors.reviewContent && <span className={styles.msgError}>{errors.reviewContent.message}</span>}
                            </div>
                            <div className={`col col-xs-12 col-md-6 col-lg-6 ${clsx(styles.reviewFormGroup)}`}>
                                <label htmlFor="reviewName" className={clsx(styles.labelRating, styles.labelFormReview)}>Name <span className={styles.redRequired}>*</span></label>
                                <input type="text" className={clsx(styles.reviewInputForm)} 
                                    id="reviewName"
                                    {...register("reviewName")}
                                />
                                {errors.reviewName && <span className={styles.msgError}>{errors.reviewName.message}</span>}
                            </div>
                            <div className={`col col-xs-12 col-md-6 col-lg-6 ${clsx(styles.reviewFormGroup)}`}>
                                <label htmlFor="reviewEmail" className={clsx(styles.labelRating, styles.labelFormReview)}>Email <span className={styles.redRequired}>*</span></label>
                                <input id="reviewEmail" type="email" className={clsx(styles.reviewInputForm)} 
                                    {...register("reviewEmail")}
                                />
                                {errors.reviewEmail && <span className={styles.msgError}>{errors.reviewEmail.message}</span>}
                            </div>
                            <div className={`col col-xs-12 col-md-12 col-lg-12 ${clsx(styles.reviewFormGroup)}`}>
                                <label htmlFor="imgReview"  className={clsx(styles.labelRating, styles.labelFormReview)}>Pictures ('jpg', 'png', 'jpeg')</label>
                                <input type="file" name="" id="imgReview" 
                                    {
                                        ...register("imgReview")
                                    }
                                />
                                {errors.imgReview && <span className={styles.msgError}>{errors.imgReview.message}</span>}
                            </div>
                            <div className={`col col-xs-12 col-md-12 col-lg-12`}>
                                <input type="submit" value="SUBMIT" className={styles.btnSubmitFormReview}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className={clsx(styles.reviewList)}>
                <p className={clsx(styles.reivewProductTitle)}>Review</p>

                <div className={clsx(styles.reviewItem)}>
                    <p className={clsx(styles.reviewItemError)}>There are no reviews yet.</p>
                    <div className={clsx(styles.reviewItemTitle)}>
                        <p className={clsx(styles.reviewItemTitleName)}>nhnkhang</p>
                        <span className={clsx(styles.reviewSpacing)}>-</span>
                        <div className={clsx(styles.listStar)}>
                            <i className={`fa-solid fa-star ${clsx(styles.productIconStarSolid, styles.active)}`}></i>
                            <i className={`fa-solid fa-star ${clsx(styles.productIconStarSolid, styles.active)}`}></i>
                            <i className={`fa-solid fa-star ${clsx(styles.productIconStarSolid, styles.active)}`}></i>
                            <i className={`fa-solid fa-star ${clsx(styles.productIconStarSolid, styles.active)}`}></i>
                            <i className={`fa-solid fa-star ${styles.productIconStarSolid}`}></i>
                        </div>
                        <span className={clsx(styles.reviewSpacing)}>-</span>
                        <p className={clsx(styles.reviewItemTitleDate)}>June 18, 2021</p>

                    </div>
                    <p className={clsx(styles.reviewItemContent)}>
                        Áo siêu đẹp luôn nhé mọi ngườiiii ơiii. Vải ổn, mềm mịn co giãn, rất là mát luôn á. Form xịn, mình cao m64 61kg bận size M rất vừa vặn và đúng basic fit luôn. Với giá như này thì rất đáng mua nhé. À shop đóng gửi áo chắc chắn gọn gàng lắm ạ. Ủng hộ 5 saoo
                    </p>
                </div>
            </div>
        </div>
        
    );
};

export default ReviewProduct;