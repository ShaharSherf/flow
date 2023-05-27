import Image from 'next/image'
import Head from 'next/head'
import { PostCard, PostWidget, Catagories } from '@/components'
import { getPosts } from '@/services'

export default function Home({posts}: {posts: Array<any>}) {
  return (
    <div className="container mx-auto px-10">
      <Head>
        <title>Flow Chat</title>
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post) => (<PostCard post={post.node} key={post.title}/>))}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget slug='' categories={[]}/>
            <Catagories/>
          </div>
        </div>
      </div>
    </div>
  )
}


export async function getStaticProps() {
  const posts  = (await getPosts()) || [];
  return {
    props: {posts}
  }
}