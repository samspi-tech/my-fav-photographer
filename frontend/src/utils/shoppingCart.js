export const totalCheckout = (array) => {
    return array.reduce((acc, item) => {
        const price = Number(item.price);
        
        return acc + price;
    }, 0);
};
