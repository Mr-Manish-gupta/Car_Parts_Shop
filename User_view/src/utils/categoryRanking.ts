import { Category , Product } from "@/types/product";


export function getTrandingCategories (categories: Category[] , products:Product[]):

Category[] {
    const categoryDemanMap: Record<number , number> = {};

    products.forEach((product) => {
        const currentDemand = categoryDemanMap[product.categoryId] || 0;

        categoryDemanMap[product.categoryId] = currentDemand + (product.stock || 1);
    });


    return [...categories].sort((a,b) => {
            const scoreB = categoryDemanMap[b.id] || 0;
            const scoreA = categoryDemanMap[a.id] || 0;
            return scoreB - scoreA;
    })
}