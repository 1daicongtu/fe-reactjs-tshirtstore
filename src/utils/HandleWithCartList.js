export const handleDataAddToCart = (product, itemSelected, sizeSelected, quantity, productDetailActive)=>{
    return {
        productID: product.productID,
        productName: product.productName,
        colorSelected: itemSelected?.color,
        sizeSelected: sizeSelected,
        quantity: quantity,
        productDetailSelected: productDetailActive
    }
}