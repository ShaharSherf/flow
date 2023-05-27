import React, { useState, useEffect } from 'react'
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '@/services';

const PostWidget = ({ categories, slug}: { categories: undefined | Array<any>, slug: undefined | string }) => {
  const [relatedPosts, setRelatedPosts] = useState<Array<any>>([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result: any) => setRelatedPosts(result))
    } else {
      getRecentPosts().then((result: any) => setRelatedPosts(result))

    }
  }, [slug]);
  console.log(categories)
  console.log(relatedPosts);
  return (
    <div className='bg-white shadow-lg rounded-lg pg-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? 'Realated Posts' : 'RecentPosts'}
      </h3>
      {relatedPosts.map(post => (
        <div key={post.title} className='flex items-center w-full mb-4'>
          <div className='w-16 float-none'>
            <img
              alt={post.title}
              height='60px'
              width='60px'
              className='align-middle rounded-full'
              src={post.featureImage.url}
            />
          </div>
          <div className='flex-grow ml-4'>
            <p className='text-gray-500 font-xs'>
              {moment(post.createdAt).format('MMM DD ,YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} key={post.title} className='text-md'>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget