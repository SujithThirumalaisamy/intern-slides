"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@repo/ui/components/ui/dropdown-menu"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@repo/ui/components/ui/avatar"
import ArchiveIcon from "./components/archive-icon"
import InboxIcon from "./components/inbox-icon"
import SendIcon from "./components/send-icon"
import FileIcon from "./components/file-icon"
import Trash2Icon from "./components/trash-2-icon"
import UsersIcon from "./components/users-icon"
import MenuIcon from "./components/menu-icon"
import SearchIcon from "./components/search-icon"
import CombineIcon from "./components/combine-icon"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Home() {
  const { data: session, status } = useSession()
  if (status !== "authenticated" && status !== 'loading') {
    redirect(`/api/auth/signin?callback=${encodeURIComponent(process.env.NEXTAUTH_URL || "")}`)
  }
  console.log(session);
  const [emails, setEmails] = useState([
    {
      id: 1,
      from: "John Smith",
      subject: "Re: Project Update",
      body: "Hi team, I wanted to provide an update on the project progress. We're on track to deliver the first phase by the end of the month. Let me know if you have any questions.",
      date: "2 days ago",
      category: "Important",
      avatarSrc: "/placeholder-user.jpg",
      avatarAlt: "John Smith",
      avatarInitials: "JS",
    },
    {
      id: 2,
      from: "Sarah Adams",
      subject: "New Design Feedback",
      body: "Hi everyone, I've reviewed the new design mockups and have some feedback to share. Let's discuss during our next meeting.",
      date: "1 week ago",
      category: "Important",
      avatarSrc: "/placeholder-user.jpg",
      avatarAlt: "Sarah Adams",
      avatarInitials: "SA",
    },
    {
      id: 3,
      from: "Michael Johnson",
      subject: "Quarterly Report",
      body: "Hi team, attached is the quarterly report for your review. Please let me know if you have any questions or need additional information.",
      date: "3 days ago",
      category: "General",
      avatarSrc: "/placeholder-user.jpg",
      avatarAlt: "Michael Johnson",
      avatarInitials: "MJ",
    },
    {
      id: 4,
      from: "Olivia Williams",
      subject: "Invitation: Team Offsite",
      body: "Hi everyone, I'd like to invite you all to our upcoming team offsite on June 15th. We'll be discussing our roadmap and planning for the next quarter. Please RSVP by June 10th.",
      date: "1 day ago",
      category: "Important",
      avatarSrc: "/placeholder-user.jpg",
      avatarAlt: "Olivia Williams",
      avatarInitials: "OW",
    },
    {
      id: 5,
      from: "Acme Deals",
      subject: "50% off sale this weekend!",
      body: "Don't miss our biggest sale of the year! Get 50% off all products this weekend only.",
      date: "2 hours ago",
      category: "Promotions",
      avatarSrc: "/placeholder-user.jpg",
      avatarAlt: "Acme Deals",
      avatarInitials: "AD",
    },
    {
      id: 6,
      from: "Facebook",
      subject: "New friend request",
      body: "You have a new friend request from Jane Doe. Click here to view.",
      date: "1 hour ago",
      category: "Social",
      avatarSrc: "/placeholder-user.jpg",
      avatarAlt: "Facebook",
      avatarInitials: "FB",
    },
    {
      id: 7,
      from: "Marketing Team",
      subject: "New product launch newsletter",
      body: "Check out our latest product launch and get exclusive early access.",
      date: "1 day ago",
      category: "Marketing",
      avatarSrc: "/placeholder-user.jpg",
      avatarAlt: "Marketing Team",
      avatarInitials: "MT",
    },
    {
      id: 8,
      from: "Spam Sender",
      subject: "You won a free vacation!",
      body: "Click here to claim your free vacation. This is not a scam.",
      date: "5 minutes ago",
      category: "Spam",
      avatarSrc: "/placeholder-user.jpg",
      avatarAlt: "Spam Sender",
      avatarInitials: "SS",
    },
  ])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const filteredEmails =
    selectedCategory === "All" ? emails : emails.filter((email) => email.category === selectedCategory)
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="hidden w-64 flex-col border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-900 md:flex">
        <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-800">
          <Link href="#" className="font-bold" prefetch={false}>
            Acme Mail
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <img src="/placeholder.svg" width="32" height="32" className="rounded-full" alt="Avatar" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>John Doe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-4">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
            prefetch={false}
          >
            <InboxIcon className="h-5 w-5" />
            Inbox
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
            prefetch={false}
          >
            <SendIcon className="h-5 w-5" />
            Sent
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
            prefetch={false}
          >
            <FileIcon className="h-5 w-5" />
            Drafts
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
            prefetch={false}
          >
            <Trash2Icon className="h-5 w-5" />
            Trash
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
            prefetch={false}
          >
            <ArchiveIcon className="h-5 w-5" />
            Archived
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
            prefetch={false}
          >
            <UsersIcon className="h-5 w-5" />
            Contacts
          </Link>
          <div className="mt-4 border-t pt-4">
            <div className="mb-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">Filter by category</div>
            <div className="grid gap-2">
              <Button
                variant={selectedCategory === "All" ? "ghost" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("All")}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "Important" ? "ghost" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("Important")}
              >
                Important
              </Button>
              <Button
                variant={selectedCategory === "Promotions" ? "ghost" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("Promotions")}
              >
                Promotions
              </Button>
              <Button
                variant={selectedCategory === "Social" ? "ghost" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("Social")}
              >
                Social
              </Button>
              <Button
                variant={selectedCategory === "Marketing" ? "ghost" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("Marketing")}
              >
                Marketing
              </Button>
              <Button
                variant={selectedCategory === "Spam" ? "ghost" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("Spam")}
              >
                Spam
              </Button>
              <Button
                variant={selectedCategory === "General" ? "ghost" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("General")}
              >
                General
              </Button>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 dark:border-gray-800 dark:bg-gray-900 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="#" className="md:hidden" prefetch={false}>
              <MenuIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </Link>
            <h1 className="text-lg font-bold">Inbox</h1>
          </div>
          <div className="flex items-center gap-4">
            <form className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search emails..."
                className="h-10 w-64 rounded-md border border-gray-300 bg-white px-10 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              />
            </form>
            <Button variant="ghost" size="icon">
              <CombineIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              <span className="sr-only">Compose</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="grid gap-4 p-4 md:p-6">
            {filteredEmails.map((email) => (
              <article
                key={email.id}
                className={`flex items-start gap-4 rounded-md border p-4 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 ${email.category === "Important"
                  ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-900"
                  : email.category === "Promotions"
                    ? "border-yellow-500 bg-yellow-50 dark:border-yellow-500 dark:bg-yellow-900"
                    : email.category === "Social"
                      ? "border-green-500 bg-green-50 dark:border-green-500 dark:bg-green-900"
                      : email.category === "Marketing"
                        ? "border-purple-500 bg-purple-50 dark:border-purple-500 dark:bg-purple-900"
                        : email.category === "Spam"
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
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
