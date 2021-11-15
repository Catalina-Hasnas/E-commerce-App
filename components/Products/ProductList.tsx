import React, { FC } from "react";
import ProductCard from "./ProductCard";

interface product {
    _id: string,
    title: string,
    amount: string,
    price: string,
    categoryId: string,
    image: string
}

interface ProductListProps {
    products: product[],
}

const ProductList = (props: ProductListProps) : JSX.Element => {

    const products = props.products;
    console.log(products)

    return (
        <div className="max-w-7xl mx-auto px-8 pb-5">
            <div className="grid justify-items-center gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                
                {products.map((product) => {
                    
                    return (
                        <ProductCard 
                            key={product._id}
                            id = {product._id}
                            title = {product.title}
                            image = {product.image}
                            price = {product.price}
                            stock={product.amount}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default ProductList;