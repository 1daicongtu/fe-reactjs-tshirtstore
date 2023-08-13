import { get } from "react-hook-form";
import { getRandomNumberWithRange } from "./getRandomNumberWithRange";

const monthsShort = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function getDeliveryTime() {
    const monthText = monthsShort[new Date().getMonth()]
    return (
        `${monthText} ${new Date().getDate()} - ${monthText}  ${new Date().getDate() + getRandomNumberWithRange(3, 10)}`
    )
}