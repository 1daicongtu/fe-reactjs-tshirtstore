import clsx from "clsx";
import styles from "./ReviewProduct.module.scss"
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { ref } from "yup";
import {get, set, useForm, useWatch} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import axios from "axios";
import { addToastMessage } from "../../HeaderComponent/ToastMessage";
import ItemComment from "./ItemComment";


const validFileExtensions = { image: ['jpg', 'png', 'jpeg'] };

function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

const validate = yup.object().shape({
    reviewName: yup.string().required("Vui lòng nhập tên"),
    reviewEmail: yup.string().required("Vui lòng nhập email").email("Email không hợp lệ"),
    reviewContent: yup.string().required("Vui lòng nhập nội dung"),
    imgReview: yup.mixed()
        .test("is-valid-type", "Vui lòng chọn file ảnh", (value)=> {
        
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
        .test("is-valid-count", "Vui lòng chọn tối đa 3 file ảnh", (value)=> {
            if (value.length === 0) return true;
            return value.length <= 3;
        })
})

const ReviewProduct = ({product}) => {
    const [starVote, setStarVote] = useState(5);
    const userLogin = useSelector(state => state.userLogin)
    const refStar = useRef(5)
    const [rateComments, setRateComments] = useState([]);
    const [updateReview, setUpdateReview] = useState(false);
    let refProduct = useRef(null);
    let refSettingComment = useRef({
        page: 1,
        limit: 5
    })


    const [commentShow, setCommentShow] = useState({
        isMax: false,
        data: []
    });
   

    const {register, handleSubmit, getValues, reset, setValue , formState: { errors, isValid, isSubmitting }, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(validate)
    });


    useWatch({ control , name: "imgReview"})

    useEffect(()=>{
        if (userLogin.user){
            setValue("reviewName", userLogin.user.firstName)
            setValue("reviewEmail", userLogin.user.email)
        } else {
            setValue("reviewName", "")
            setValue("reviewEmail", "")
        }
    }, [userLogin])

    useEffect(()=>{
        const getRateComments = async()=>{
            try {
                const res = await axios.get(`${process.env.REACT_APP_PROXY}/comments/get-rate-comment`,
                {
                    params: {
                        productID: product.productID
                    }
                }) 
                
                if (res.status === 200 && res.data.result){
                    setRateComments(res.data.result);
                } else {
                    setRateComments([]);
                }
                
            } catch (error) {
                setRateComments([]);
            }
    
        }
        getRateComments();
    }, [product, updateReview])


    useEffect(()=>{
        refSettingComment.current = {
            page: 1,
            limit: 5
        }
    }, [product])

    useEffect(()=>{
        const getCommentShow = async()=>{
            try {
                const params = {
                    productID: product.productID,
                    page: refSettingComment.current.page,
                    limit: refSettingComment.current.limit
                }
                if (refProduct.current !== product){
                    params.page = 1;
                    params.limit = 5
                }
              
                const res = await axios.get(`${process.env.REACT_APP_PROXY}/comments/get-comment`,
                {
                    params
                }) 
               
                if (res.status === 200 && res.data.result && refProduct.current === product){
                    let newData = await getNewCommentWithImageDimension(res.data.result)
                
                    setCommentShow({isMax: res.data.isMax, data: [...commentShow.data, ...newData]});
                }
                else if (res.status === 200 && res.data.result && refProduct.current !== product){
                    let newData = await getNewCommentWithImageDimension(res.data.result)
                    

                    setCommentShow({isMax: res.data.isMax, data: [...newData]});
                }
                else {
                    setCommentShow({isMax: false, data: []});
                }
                
            } catch (error) {
                setCommentShow({isMax: false, data: []});
            }
    
        }
        getCommentShow();
        return ()=>{
            refProduct.current = product;
        }
    }, [refSettingComment, updateReview, product])

    const getNewCommentWithImageDimension = async (comments)=>{
        if (!comments && comments.length === 0){
            return [];
        }
        let newData = await Promise.all(comments.map(async (comment, indexCmt)=>{
            let newImages = null;
            if (comment.images && comment.images.length > 0){
                newImages = await Promise.all(comment.images.map( async (item)=>{
                
                    const  {width, height} = await getImageDimensions(item.url)
                    
                    return {
                        ...item,
                        width,
                        height
                    }
                }))
            }
            return {
                ...comment,
                images: newImages
            }
           
        }))
        return newData;
    }

    const getAvgRating = (rateComments) => {
        if (rateComments.length === 0) return 0;
        let totalRating = 0;
        let totalCount = 0;
        totalCount = rateComments.reduce((a, b) => a + b.count, 0);
        totalRating = rateComments.reduce((a, b) => a + (b.count * b.star), 0);
        return (totalRating / totalCount).toFixed(2);
    }
    const getPercentageRating = (rateComments, star) => {
        if (rateComments.length === 0) return 0;
        let totalCount = 0;
        totalCount = rateComments.reduce((a, b) => a + b.count, 0);

        let countVote = 0;
        for (let rateComment of rateComments){
            if (rateComment.star === star){
                countVote = rateComment.count;
                break;
            }
        }
        return Math.floor(countVote / totalCount * 100)


    }

    const handleSubmitForm = async(data) => {
        if (isValid){
            
            let finalData = new FormData();

            finalData.append("data", JSON.stringify({
                productID: product.productID,
                rating: starVote,
                comment: data.reviewContent,
                name: data.reviewName,
                email: data.reviewEmail,
                userID: userLogin.user ? userLogin.user._id : null
                    
            }))
            
            for (let file of data.imgReview){

                finalData.append("images", file)
            }

            try {
                const res = await axios.post(`${process.env.REACT_APP_PROXY}/comments/post-comment`, finalData,
                    {
                        headers: {
                        'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                if (res.status === 200){
                    addToastMessage(
                        {
                            title: "Thành công",
                            message: "Đánh giá của bạn đã được gửi thành công",
                            type: "success"
                        }
                    )
                    reset();
                    if (userLogin.user){
                        setValue("reviewName", userLogin.user.firstName)
                        setValue("reviewEmail", userLogin.user.email)
                    }
                    setUpdateReview(!updateReview)
                }
            } catch (error) {
                addToastMessage({
                    title: "Thất bại",
                    message: "Đánh giá của bạn chưa được gửi thành công",
                    type: "error"
                })
            }
        }
    }

    return (
        <div className={clsx(styles.reviewProduct)}>
            <div className={` row `}>
                <div className={`col col-xs-12 col-md-6 col-lg-6`}>
                    <p className={clsx(styles.reivewProductTitle)}>Based On {
                        rateComments.length > 0 
                        &&
                        rateComments.reduce((a, b) => a + b.count, 0)
                    } Reviews</p>

                    <p className={clsx(styles.reviewAvgReview)}>
                        {getAvgRating(rateComments)}
                        <span className={clsx(styles.reviewAvgReviewTitle)}>Overall</span>
                    </p>

                    <div className={clsx(styles.reviewProductRatingList)}>
                        {
                            Array(5).fill().map((v1,index)=>{
                                const percent = getPercentageRating(rateComments, 5-index)
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
                                            
                                            <div className={clsx(styles.reviewProductRatingProgress, styles.reviewProductGood)} style={{width: `${percent}%`}}>
                                            </div>
                                        </div>
                                        <p className={clsx(styles.reviewProductPercentage)}>{percent}%</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={`col col-xs-12 col-md-6 col-lg-6`}>
                    <p className={clsx(styles.reivewProductTitle)}>Be The First To Review {`"${product.productName}"`}</p>

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
                                            disabled={!!userLogin.user}      
                                        />
                                {errors.reviewName && <span className={styles.msgError}>{errors.reviewName.message}</span>}
                                
                            </div>
                            <div className={`col col-xs-12 col-md-6 col-lg-6 ${clsx(styles.reviewFormGroup)}`}>
                                <label htmlFor="reviewEmail" className={clsx(styles.labelRating, styles.labelFormReview)}>Email <span className={styles.redRequired}>*</span></label>
                            
                                        <input id="reviewEmail" type="email" className={clsx(styles.reviewInputForm)} 
                                        {...register("reviewEmail")}
                                        disabled={!!userLogin.user}
                                        />
                                        {errors.reviewEmail && <span className={styles.msgError}>{errors.reviewEmail.message}</span>}
                                
                            </div>
                            <div className={`col col-xs-12 col-md-12 col-lg-12 ${clsx(styles.reviewFormGroup)}`}>
                                <label htmlFor="imgReview"  className={clsx(styles.labelRating, styles.labelFormReview)}>Pictures ('jpg', 'png', 'jpeg')
                                    - max 3 photos <span className={styles.redRequired}>*</span>
                                </label>
                                <input type="file" name="" id="imgReview" 
                                    {
                                        ...register("imgReview")
                                    }
                                    multiple="multiple"
                                />
                                <div className={clsx(styles.previewImgBox)}>
                                    {
                                        !errors.imgReview
                                        &&
                                        getValues("imgReview")
                                        &&
                                        Array.from(getValues("imgReview")).length > 0
                                        && 
                                        Array.from(getValues("imgReview")).map((v, index)=>{
                                            return (
                                                <img key={index} src={URL.createObjectURL(v)} alt="" 
                                                    className={clsx(styles.imgPreviewBeforeUpload)}
                                                />
                                            )
                                        })
                                   
                                    }
                                </div>
                                {errors.imgReview && <span className={styles.msgError}>{errors.imgReview.message}</span>}
                            </div>
                            <div className={`col col-xs-12 col-md-12 col-lg-12`}>
                                <button type="submit"
                                    disabled={isSubmitting}  
                                    className={clsx(styles.btnSubmitFormReview, isSubmitting ? styles.disabled : "")}
                                >
                                    <i className={`fa-solid fa-spinner ${styles.btnSubmitIconInifinite}`}></i>
                                    Submit

                                </button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className={clsx(styles.reviewList)}>
                <p className={clsx(styles.reivewProductTitle)}>Review</p>

                {
                        commentShow && commentShow.data?.length === 0
                        ?
                        <p className={clsx(styles.reviewItemError)}>There are no reviews yet.</p>
                        :
                        
                            commentShow.data?.map((v, index)=>{
                                return (
                                   <ItemComment comment={v} key={index}></ItemComment>
                                )
                            }) 
                }

                {
                    !commentShow.isMax && commentShow.data.length > 0
                     &&
                     <div className={clsx(styles.boxLoadMoreComment)}>
                        <button className={clsx(styles.btnLoadMoreReview)}
                            onClick={()=> {
                                refSettingComment.current = {page: refSettingComment.current.page + 1, limit: refSettingComment.current.limit}
                                setUpdateReview(!updateReview)
                            }}
                        >
                            Load More
                        </button>
                    </div>
 
                }
             {/*    <div className={clsx(styles.reviewItem)}>
                   
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
                </div> */}
            </div>
        </div>
        
    );
};

export default ReviewProduct;

export const getImageDimensions = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({
        width: img.width,
        height: img.height,
      });
      img.onerror = (error) => reject(error);
      img.src = url;
    });
};