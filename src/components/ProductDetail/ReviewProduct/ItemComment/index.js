import styles from "./ItemComment.module.scss";
import clsx from "clsx";
import PhotoSwipeLightbox from '../../../../../node_modules/photoswipe/dist/photoswipe-lightbox.esm';
import '../../../../../node_modules/photoswipe/dist/photoswipe.css';
import 'photoswipe/style.css';
import { useEffect } from "react";

function ItemComment({comment}) {
    const photoSwipeID = 'galeryPhotoSwift'


    useEffect(()=>{
        let lightbox = new PhotoSwipeLightbox({
            gallery: '#' + photoSwipeID,
            children: 'a',
            initialZoomLevel: 'fit',
            pswpModule: () => import('photoswipe'),
        });

        lightbox.init();
      
        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, [])

    return (
        <div className={clsx(styles.reviewItem)}>
                    
            <div className={clsx(styles.reviewItemTitle)}>
                <p className={clsx(styles.reviewItemTitleName)}>{comment.name}</p>
                <span className={clsx(styles.reviewSpacing)}>-</span>
                <div className={clsx(styles.listStar)}>
                    {
                        Array(5).fill(0).map((vStar, indexStar)=>{
                            if (indexStar+1 <= comment.rating){
                                return (
                                    <i 
                                        className={`fa-solid fa-star ${clsx(styles.productIconStarSolid, styles.active)}`}
                                        key={indexStar}
                                    ></i>
                                )
                            } else {
                                return (
                                    <i 
                                        className={`fa-solid fa-star ${styles.productIconStarSolid}`}
                                        key={indexStar}
                                    >

                                    </i>
                                )
                            }
                        })
                    }

                </div>
                <span className={clsx(styles.reviewSpacing)}>-</span>
                <p className={clsx(styles.reviewItemTitleDate)}>{comment.date?.toString().split("T")[0]}</p>

            </div>
            <p className={clsx(styles.reviewItemContent)}>
                {comment.comment}
            </p>

            <div
                className={clsx(styles.boxGalery)}    
                id={photoSwipeID}    
            >   
                {
                    comment.images && comment.images.length > 0 
                    ?
                        comment.images.map((image, indexImg)=>{
                            return (
                                <a href={image.url}
                                    data-pswp-width={image.width}
                                    data-pswp-height={image.height}
                                    key={photoSwipeID+"-"+indexImg}
                                    target="_blank"
                                    rel="noreferrer"

                                    
                                >
                                    <img
                                        className={clsx(styles.imageThumnailPreview)}
                                        src={image.url} alt="" 
                                    />
                                </a>
                            )
                        })
                    :
                    <></>
                }
               
            </div>
        </div>
    );
}

export default ItemComment;


