import React, { useState, useEffect, useRef } from 'react'
import { submitComment } from '@/services';


const CommentsForm = ({ slug }: { slug: string }) => {
  const [error, setError] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const commentEl = useRef<HTMLTextAreaElement>(null);
  const nameEl = useRef<HTMLInputElement>(null);
  const emailEl = useRef<HTMLInputElement>(null);
  const stroreDataEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name') || ''
    emailEl.current.value = window.localStorage.getItem('email') || ''
  }, [])
  

  const handleCommentSubmission = () => {
    setError(false);
    const comment = commentEl.current?.value;
    const name = nameEl.current?.value;
    const email = emailEl.current?.value;
    const storeData = stroreDataEl.current?.checked;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug }

    if (storeData) {
      localStorage.setItem('name', name)
      localStorage.setItem('email', email)
    } else {
      localStorage.removeItem('name')
      localStorage.removeItem('email')
    }

    submitComment(commentObj)
    .then(() => {
      setShowSuccessMessage(true);
      
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000)
    })
  }
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a Replay</h3>
      <div className='gtid grid-cols-1 gap-4 mb-4'>
        <textarea ref={commentEl}
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          placeholder='Comment'
          name='Comment'
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input type='text' ref={nameEl}
          className='py-2 px-4 4outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          placeholder='Name'
          name='Name'
        />
        <input type='text' ref={emailEl}
          className='py-2 px-4 4outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          placeholder='Email'
          name='Email'
        />
      </div>
      <div className='gtid grid-cols-1 gap-4 mb-4'>
        <div>
          <input ref={stroreDataEl} type='checkbox' id='storeData' name='storeData' defaultChecked={true} />
          <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'> Save my e-mail and mail for next time I comment</label>
        </div>
      </div>
      {error && <p className='text-xs text-red-500'> All fields are required</p>}
      <div className='mt-8'>
        <button
          type='button'
          className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'

          onClick={handleCommentSubmission}>
          Post Comment
        </button>
        {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'> Comment submitted for review</span>}
      </div>
    </div>
  )
}

export default CommentsForm