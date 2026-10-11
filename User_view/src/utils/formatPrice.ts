export function formatPrice(price: number | string):string{
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    if( isNaN(numericPrice)) return "$0.00";
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits : 2,
    }).format(numericPrice);
}