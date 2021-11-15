import type { GetStaticPaths, GetStaticPropsResult, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { connectToDatabase } from '../services/database.service';
import ProductList from '../components/Products/ProductList';
import { dehydrate, DehydratedState, QueryClient, useQuery } from 'react-query';
import { GetStaticProps } from 'next';

interface product {
  _id: string,
  title: string,
  amount: string,
  price: string,
  categoryId: string,
  image: string
}

interface HomeProps {
  products: product[]
}

const Home = (props: HomeProps) => {
  return (
    <div className="max-w-7xl mx-auto px-8 pb-5">
      <div className="grid justify-items-center gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <ProductList products={props.products} />
      </div>
    </div>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProps>> {

  const { products } = await connectToDatabase();

  const productsArray = await products?.find().toArray();

  return {
    props: {
      products: productsArray?.map((product) => ({
        title: product.title,
        amount: product.amount,
        image: product.image,
        price: product.price,
        categoryId: product.categoryId,
        id: product._id.toString(),
      }))
    },
  };
}


  

export default Home
