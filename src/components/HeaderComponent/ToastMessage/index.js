
import clsx from "clsx";
import styles from "./ToastMessage.module.scss";




export const addToastMessage = ({title, message, type= "info", duration = 3000})=> {
    const main = document.getElementById("toast-id");
    if (main) {
        const toast = document.createElement("div");

        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
        }, duration + 1000);

        // Remove toast when clicked
        toast.onclick = function (e) {
 
        if (e.target.type = "I" && e.target.parentElement?.classList?.contains(styles.toastclose)) {
            main.removeChild(toast);
            clearTimeout(autoRemoveId);
        }
        };

        const icons = {
            success: "fa-solid fa-circle-check",
            info: "fa-solid fa-circle-info",
            warning: "fa-solid fa-triangle-exclamation",
            error: "fa-solid fa-circle-exclamation"
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);
        const toastType = `toast${type}`
        toast.classList.add(styles.toast, styles[toastType]);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
       
        toast.innerHTML = `
                    <div class=${clsx(styles.toasticon)}>
                        <i class="${icon}"></i>
                    </div>
                    <div class=${clsx(styles.toastbody)}>
                        <h3 class=${clsx(styles.toasttitle)}}>${title}</h3>
                        <p class=${clsx(styles.toastmsg)}>${message}</p>
                    </div>
                    <div class=${clsx(styles.toastclose)}>
                        <i class="fa-solid fa-xmark ${styles.toastcloseicon}"></i>
                    </div>
        `;
        main.appendChild(toast);
    }
}
const ToastMessage = () => {
    

    return (
        <div id="toast-id" className={clsx(styles.toastBox)}>
           
        </div>
    );
};

export default ToastMessage;