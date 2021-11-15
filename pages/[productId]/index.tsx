import ProductPage from '../../components/Products/ProductPage';
import { MongoClient, ObjectId } from 'mongodb';
import { connectToDatabase } from '../../services/database.service';
import { GetStaticPropsResult, GetStaticPropsContext } from 'next'

interface productData {
    productData: {
        id: string,
        title: string,
        amount: string,
        price: string,
        categoryId: string,
        image: string
    }
}

const ProductDetails = (props: productData) => {

    console.log('props')
    console.log(props)
    
    return (
        <ProductPage
            id = {props.productData.id}
            title = {props.productData.title}
            amount = {props.productData.amount}
            price = {props.productData.price}
            categoryId = {props.productData.categoryId}
            image= {props.productData.image}
        />
    )
}

export async function getStaticPaths() {
    const { products }  = await connectToDatabase();
    const productsPaths = await products?.find({}, {_id: 1}).toArray();

    return {
        fallback: true,
        paths: productsPaths?.map((product => ({
            params: {
                productId: product._id.toString()
            }
        })))   
    }
}

export async function getStaticProps(context: any): Promise<GetStaticPropsResult<productData>> {
    const productId = context.params.productId;

    const { products }  = await connectToDatabase();
     
    const product = await products?.findOne({_id: new ObjectId(productId)});

    return {
        props: {
            productData: {
                title: product?.title,
                image: product?.image,
                amount: product?.amount,
                categoryId: product?.categoryId,
                price: product?.price,
                id: product?._id.toString()
            }
        },
        // revalidate: 1
    }
    
}

export default ProductDetails