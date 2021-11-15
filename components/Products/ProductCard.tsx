import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


interface IProductCardProps {
    id: string,
    title: string,
    image: string,
    price: string,
    stock: string,
}

const ProductCard = (props: IProductCardProps): JSX.Element => {

    const router = useRouter();

    const showDetailsHandler = () => {
    router.push(`/${props.id}`)
  }


        const linkTo = <Link href="/">
            <div onClick={() => console.log('some')}
                className="font-bold text-center p-3 border-t border-secondary bg-transparent text-primary tracking-widest hover:bg-secondary hover:text-primaryLight transition ease-out duration-200">
                Add to cart
            </div>
        </Link>
    

    return (
        <div className="relative flex flex-col w-64 justify-evenly rounded overflow-hidden shadow-lg border-l border-r border-t border-b border-secondary h-96">
            <button onClick={showDetailsHandler}>
                <img className="w-full h-60" src={props.image} alt={props.title} />

                {/* {props.promotion? <div className="bg-secondary p-2 top-px left-32 rounded-md text-primaryLight text-xs my-2 absolute"> {props.promotion.promotionalText} </div> : null } */}

                <div className="px-1 text-center border-t border-secondary h-20 flex flex-col justify-center">
                    <span className="font-bold text-l whitespace-nowrap overflow-ellipsis overflow-hidden tracking-wider p-1">{props.title}</span>
                    
                    {/* {props.promotion ? (
                        <div className="flex justify-center my-2 items-center ">
                            <span className="mr-1 text-sm text-gray-500 line-through"> {props.price}$</span>
                            <span className="rounded-md bg-secondary p-1 text-primaryLight tracking-wide text-lg ">{(props.price - props.promotion.discount).toFixed(2)} $</span>
                        </div> */}
                    <div className="flex justify-center items-center mt-3">
                        <span className="rounded-sm text-primary tracking-wide text-lg"> {props.price} $</span>
                    </div> 
                </div>
                
            </button>
        
            {linkTo}
            
     </div>
        
    )
}

export default ProductCard;