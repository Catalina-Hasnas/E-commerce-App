import React, { Fragment, useRef, useState } from 'react';
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'

interface productPageProps {
    id: string,
    title: string,
    amount: string,
    price: string,
    categoryId: string,
    image: string
}

const ProductPage = (props: productPageProps): JSX.Element => {

    const product = props;

    const [amount, setAmount] = useState(1);
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null)

    // let navBar = orderItems ? <NavBar orderItemsLength={orderItems.length} /> : <NavBar />

    const disablePlusButton = () => amount >= parseInt(product.amount) ? true : false;

    const disableMinusButton = () => amount <= 1 ? true : false;

    return (

        <Fragment>
            
            <div className="shadow-lg flex justify-center items-center max-w-xl mx-auto mt-5 bg-bg rounded-sm border border-secondary">
                <div className="flex flex-col justify-center items-center my-3">

                    <div className="w-1/2 h-auto">
                        <img className="rounded-sm object-cover mx-auto" src={product.image} alt={product.title} />
                    </div>

                    <div className="mx-auto flex flex-col items-center justify-center mt-5">
                        <h3 className="uppercase text-primary font-bold text-2xl tracking-widest text-center">{product.title}</h3>
                        {/* <div className="flex items-center justify-center">
                            { product.promotion? 
                                <span className="text-gray-500 line-through"> {product.price}$ </span> : null }
                            
                            <span className="text-xl p-5">{(product.promotion !== undefined && product.promotion !== null ? (product.price - product.promotion.discount).toFixed(2) : (product.price - 0).toFixed(2))}$</span>
                        </div> */}
                        <div className=" flex flex-col items-center">

                            <p className=""> Quantity: {amount} </p>
                            {amount === parseInt(product.amount) ?
                                <p className="text-xs">There are only {product.amount} products left in stock.</p> : null}
                            <div className="flex mt-1 p-2">
                                <input type="button" value="+" disabled={disablePlusButton()} className="px-2 mr-3 bg-transparent border-secondary rounded-sm border hover:bg-secondary hover:text-primaryLight transition ease-out duration-200" onClick={() => setAmount(amount + 1)} />
                                <input type="button" value="-" disabled={disableMinusButton()} className="bg-transparent px-2 border-secondary rounded-sm border hover:bg-secondary hover:text-primaryLight transition ease-out duration-200" onClick={() => setAmount(amount - 1)} />
                            </div>

                            <div className="flex items-end mt-3">
                                <button
                                    className="mr-2 p-3 rounded-sm bg-secondary text-primaryLight tracking-wider">
                                    Add to cart
                                </button>


                            </div>
                            <Transition.Root show={open} as={Fragment}>
                                <Dialog
                                    as="div"
                                    static
                                    className="fixed z-10 inset-0 overflow-y-auto"
                                    initialFocus={cancelButtonRef}
                                    open={open}
                                    onClose={setOpen}
                                >
                                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                        </Transition.Child>

                                        {/* This element is to trick the browser into centering the modal contents. */}
                                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                            &#8203;
                                        </span>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        >
                                            <div className="inline-block align-bottom bg-white rounded-lg  overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                    <div className="flex justify-center">
                                                        <div className="mt-3 sm:mt-0">
                                                            <Dialog.Title as="h2" className="text-lg leading-6 font-medium text-green-700">
                                                                Product added to cart!
                                                            </Dialog.Title>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 px-4 py-3 flex justify-around">
                                                    <Link href="/cart">
                                                        <button style={{animationIterationCount: 1}} className="animate-bounce flex justify-between p-2 items-center border border-secondary rounded-sm">
                                                            See your shopping cart
                                                            {/* <ShoppingCartIcon className="h-9 w-9 text-secondary" aria-hidden="true" /> */}
                                                        </button>
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        className="flex justify-between p-2 items-center border border-secondary rounded-sm hover:bg-secondary hover:text-primaryLight transition ease-out duration-200"
                                                        onClick={() => setOpen(false)}
                                                        ref={cancelButtonRef}
                                                    >
                                                        Back to product
                                                    </button>
                                                </div>
                                            </div>
                                        </Transition.Child>
                                    </div>
                                </Dialog>
                            </Transition.Root>

                        </div>
                    </div>
                </div>
            </div>
    </Fragment>
    )

}

export default ProductPage;