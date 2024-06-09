import React from 'react'
import { Category, Email } from '../utils'
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/ui/avatar'

export default function EmailItem({ email }: { email: Email }) {
  return (

    <article
      key={email.id}
      className={`flex items-start gap-4 rounded-md border p-4 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 ${email.category === Category.Important
        ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-900"
        : email.category === Category.Promotions
          ? "border-yellow-500 bg-yellow-50 dark:border-yellow-500 dark:bg-yellow-900"
          : email.category === Category.Social
            ? "border-green-500 bg-green-50 dark:border-green-500 dark:bg-green-900"
            : email.category === Category.Marketing
              ? "border-purple-500 bg-purple-50 dark:border-purple-500 dark:bg-purple-900"
              : email.category === Category.Spam
                ? "border-red-500 bg-red-50 dark:border-red-500 dark:bg-red-900"
                : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
        }`}
    >
      <div className="flex-shrink-0">
        <Avatar className="h-10 w-10">
          <AvatarImage src={email.avatarSrc} alt={email.avatarAlt} />
          <AvatarFallback>{email.avatarInitials}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-medium">{email.from}</div>
          <div className="flex items-center gap-2">
            <div className="text-xs">{email.category}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{email.date}</div>
          </div>
        </div>
        <div className="text-sm font-medium">{email.subject}</div>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{email.body}</p>
      </div>
    </article>
  )
}
