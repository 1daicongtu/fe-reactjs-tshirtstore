export default function getColor(product){
    return product.listProduct.map((productDetail, index) => {
        return productDetail.color;
    })
}