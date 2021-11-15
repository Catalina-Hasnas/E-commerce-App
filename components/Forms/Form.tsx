import React, { Fragment, useEffect, useRef, useState } from 'react';
import { FormTypes } from '../../types/formTypes';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationIcon } from '@heroicons/react/outline'
import Link from 'next/link'

interface FormProps {
    type: FormTypes
    productId?: any,
    title?: string,
    amount?: number,
    price?: number,
    categoryId?: number,
    image?: string,
    promotion?: {
        id: number,
        discount: number,
        promotionalText: string
    }
}

interface product {
    id?: any,
    title: any,
    amount: any,
    price: any,
    categoryId: any,
    image: any,
    // promotionId: any
}

interface promotion {
    id: number,
    discount: number,
    promotionalText: string
}

const Form = (props: FormProps): JSX.Element => {

    // const [promotions, setPromotions] = useState<promotion[]>([]);

    const [open, setOpen] = useState(false)

    const [submitted, setSubmitted] = useState(false);
    const cancelButtonRef = useRef(null)

    const formType = <h2 className="text-2xl font-bold leading-none mt-2"> {props.type === FormTypes.create ? 'Create product' : 'Update product'} </h2>


    // const formType = props.type === FormTypes.create ? ( <h2 className="text-2xl font-bold leading-none mt-2"> Create Product </h2> )  : ( <h2 className="text-2xl font-bold leading-none mt-2"> Update Product </h2> ) 

    // const promotionInfo = (
    //     <Fragment>
    //         <label className="font-semibold" htmlFor="promotionId"></label>
    //         <Field className="border rounded outline-none p-1 bg-gray-100" as="select" id="promotionId" name="promotionId">
    //             {promotions.map((promo) => (<option key={promo.id} value={promo.id}>{promo.promotionalText}</option>))}
    //         </Field>
    //     </Fragment>
    // );
        

    // let promotionId = 1;
    // if (FormTypes.update && props.promotion?.id) {
    //     promotionId = props.promotion.id;
    // }

    let categoryId = 1;
    if (FormTypes.update && props.categoryId) {
        categoryId = props.categoryId;
    }

    return (
        <Fragment>
            <Formik
                enableReinitialize

                initialValues={{
                    title: props.type === FormTypes.update ? props.title : "",
                    amount: props.type === FormTypes.update ? props.amount : "",
                    price: props.type === FormTypes.update ? props.price : "",
                    categoryId: categoryId,
                    image: props.type === FormTypes.update ? props.image : "",
                    hasPromotion: (props.promotion === null) ? false : true,
                    // promotionId: promotionId
                }}

                validationSchema={Yup.object({
                    title: Yup.string()
                        .strict()
                        .required("Please enter a title")
                        .min(8, "The title must be at least 8 characters long")
                        .max(50, "The title can't cant be longer than 50 characters")
                        .trim("Please remove the white spaces around the title"),

                    amount: Yup.number()
                        .required("Please enter the number of products on stock")
                        .positive("Please enter a positive number")
                        .integer("Please enter an integer"),

                    price: Yup.number()
                        .required("Please enter the number of products in stock")
                        .positive("Please enter a positive number"),

                    image: Yup.string()
                        .required("Please enter a url for an image")
                        .url("Please enter a url"),
                })}

                onSubmit={async (values) => {
                    if (props.type === FormTypes.update) {
                        let updatedProduct: product = {

                            id: props.productId,
                            title: values.title,
                            amount: values.amount,
                            price: values.price,
                            categoryId: values.categoryId,
                            image: values.image,
                            // promotionId: values.hasPromotion ? values.promotionId : null
                        }

                        
                    } else if (props.type === FormTypes.create) {
                        let newProduct: product = {
                            title: values.title,
                            amount: values.amount,
                            price: values.price,
                            categoryId: values.categoryId,
                            image: values.image,
                            // promotionId: values.hasPromotion ? values.promotionId : null
                        }
                        await fetch('/api/newProduct', {
                            method: 'POST',
                            body: JSON.stringify(newProduct),
                            headers: {
                                'Content-Type': 'application/json'
                            }  
                        });
                        
                        
                    }
                }}>

                {({ errors, touched, values }) => (

                    <FormikForm className="max-w-sm w-full rounded-sm shadow-md p-5 bg-white">

                        {formType}

                        <div className="my-4">
                            <div className="flex flex-col">

                                <label className="font-semibold mb-2" htmlFor="title">Title</label>
                                <Field className="border rounded outline-none p-1 bg-gray-100" id="title" name="title" />
                                {errors.title && touched.title ? (
                                    <p className="text-xs text-red-500">{errors.title}</p>
                                ) : null}

                                <label className="font-semibold my-2" htmlFor="amount">Quantity</label>
                                <Field className="border rounded outline-none p-1 bg-gray-100" id="amount" name="amount" />
                                {errors.amount && touched.amount ? (
                                    <p className="text-xs text-red-500">{errors.amount}</p>
                                ) : null}

                                <label className="font-semibold my-2" htmlFor="price">Price</label>
                                <Field className="border rounded outline-none p-1 bg-gray-100" id="price" name="price" />
                                {errors.price && touched.price ? (
                                    <p className="text-xs text-red-500">{errors.price}</p>
                                ) : null}

                                <label className="font-semibold my-2" htmlFor="image">Image</label>
                                <Field className="border rounded outline-none p-1 bg-gray-100" id="image" name="image" />
                                {errors.image && touched.image ? (
                                    <p className="text-xs text-red-500">{errors.image}</p>
                                ) : null}

                                <label className="font-semibold my-2" htmlFor="categoryId">Category Id</label>
                                <Field className="border rounded outline-none p-1 bg-gray-100" as="select" id="categoryId" name="categoryId">
                                    {["Coffee", "Tea", "Milk", "Sweeteners", "Coffee Machines"].map((i: string, index: number) => (<option key={i} value={index + 1}>{i}</option>))}
                                </Field>

                                {/* <label className="font-semibold my-2" htmlFor="hasPromotion">
                                    <Field className="font-semibold mr-2" htmlFor="hasPromotion" type="checkbox" name="hasPromotion" />
                                    Has promotion
                                </label> */}

                                {/* {values.hasPromotion ? promotionInfo : null} */}

                                {submitted? (
                                    <div className="flex flex-col my-2">
                                        <p style={{animationIterationCount: 1}} className="tracking-wide text-green-700 animate-pulse">Product successfully submitted!</p>
                                        <Link href="/backoffice"> return to backoffice </Link>
                                    </div>
                                ) : null}
                                <button className="mt-5 self-center w-1/2 text-lg tracking-wide px-6 py-1 outline-none rounded-sm bg-secondary text-white" type="submit">Submit</button>

                            </div>

                        </div>

                    </FormikForm>
                )}

            </Formik>

            {props.type === FormTypes.update ?

                <div className="max-w-sm w-full rounded-sm shadow-md p-5 bg-white mt-2 flex justify-center items-center">
                    <button onClick={() => setOpen(true)} className="w-1/2 text-lg tracking-wide px-6 py-1 outline-none rounded-sm bg-red-700 text-white" type="submit">Delete product</button>
                </div> : null
            }

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
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            {/* <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Are you sure you want to delete this product?
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    The data will be permanently removed.
                                                    This action cannot be undone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

        </Fragment>
    )
};

export default Form;
