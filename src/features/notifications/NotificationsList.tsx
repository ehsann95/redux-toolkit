import { useLayoutEffect, useEffect } from 'react'
import classnames from 'classnames'

import { useAppDispatch, useAppSelector } from '@/app/hooks'

import { TimeAgo } from '@/components/TimeAgo'
import { PostAuthor } from '@/features/posts/PostAuthor'

import { allNotificationsRead, fetchNotifications, selectAllNotifications } from './notificationsSlice'

export const NotificationsList = () => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(selectAllNotifications)

  // useEffect(() => {
  //   dispatch(fetchNotifications())
  // }, [])

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification) => {
    const notificationClassname = classnames('notification', {
      new: notification.isNew,
    })
    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>
            <PostAuthor userId={notification.user} showPrefix={false} />
          </b>{' '}
          {notification.message}
        </div>
        <TimeAgo timestamp={notification.date} />
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
