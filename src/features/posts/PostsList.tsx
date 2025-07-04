import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/app/hooks'

import { Post, selectAllPosts, fetchPosts, selectPostsStatus, selectPostsError } from './postsSlice'
import { TimeAgo } from '@/components/TimeAgo'
import { Spinner } from '@/components/Spinner'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButton'

interface PostExcerptProps {
  post: Post
}

export const PostsList = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectAllPosts)
  const postStatus = useAppSelector(selectPostsStatus)
  const postsError = useAppSelector(selectPostsError)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  const PostExcerpt = ({ post }: PostExcerptProps) => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h3>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <ReactionButtons post={post} />
      </article>
    )
  }

  let content: React.ReactNode

  if (postStatus === 'pending') {
    content = <Spinner text="loading..." />
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => <PostExcerpt key={post.id} post={post} />)
  } else if (postStatus === 'rejected') {
    content = <div>{postsError}</div>
  }

  // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  // const renderedPosts = orderedPosts.map((post) => (
  //   <article className="post-excerpt" key={post.id}>
  //     <h3>
  //       <Link to={`/posts/${post.id}`}>{post.title}</Link>
  //     </h3>
  //     <PostAuthor userId={post.user} />
  //     <TimeAgo timestamp={post.date} />
  //     <p className="post-content">{post.content.substring(0, 100)}</p>
  //     <ReactionButtons post={post} />
  //   </article>
  // ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
