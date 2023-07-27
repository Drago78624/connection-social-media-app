import React from 'react'
import Post from '../components/Post'
import { createPortal } from 'react-dom'
import Modal from '../components/Modal'
import CreatePost from '../components/CreatePost'

const Browse = () => {
  return (
    <div className="container mx-auto min-h-screen pt-24 p-4">
      <h1 className="text-center text-3xl md:text-5xl mb-6 font-semibold ">Your Feed</h1>
      <CreatePost />
      <Post marginBottom={6} shadow="shadow-lg" padding={4} />
      <Post marginBottom={6} shadow="shadow-lg" padding={4} />
      <Post marginBottom={6} shadow="shadow-lg" padding={4} />
      <Post marginBottom={6} shadow="shadow-lg" padding={4} />
      {createPortal(<Modal />, document.body)}
    </div>
  )
}

export default Browse