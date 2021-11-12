import React, { FC } from "react";
import Form from './Form';
import { FormTypes } from '../../types/formTypes';
import Link  from 'next/link';

const AddProductForm: FC = () => {

    return (
            <div className="min-h-screen flex justify-center items-center bg-gray-200 text-gray-800 relative">
                <Link href="/backoffice"> Backoffice </Link>
                <Form type = {FormTypes.create} />
            </div>
        
    );
}

export default AddProductForm;