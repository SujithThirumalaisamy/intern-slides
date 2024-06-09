"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Input } from "@repo/ui/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@repo/ui/components/ui/avatar"
import InboxIcon from "./components/icons/inbox-icon"
import SendIcon from "./components/icons/send-icon"
import FileIcon from "./components/icons/file-icon"
import Trash2Icon from "./components/icons/trash-2-icon"
import UsersIcon from "./components/icons/users-icon"
import MenuIcon from "./components/icons/menu-icon"
import SearchIcon from "./components/icons/search-icon"
import CombineIcon from "./components/icons/combine-icon"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Category, Email, fetchMails, formatDateAsTime } from "./utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@repo/ui/components/ui/dropdown-menu"
import { Button } from "@repo/ui/components/ui/button"
import ArchiveIcon from "./components/icons/archive-icon"

export default function Home() {
  const { data: session, status } = useSession()
  if (status !== "authenticated" && status !== "loading") {
    redirect(`/api/auth/signin?callback=${encodeURIComponent(process.env.NEXTAUTH_URL || "")}`);
  }
  const [emails, setEmails] = useState<Email[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const filteredEmails = selectedCategory === "All" ? emails : emails.filter((email) => email.category === selectedCategory)
  useEffect(() => {
    var accessToken = localStorage.getItem("not_google_access_token") || null;
    var userId = localStorage.getItem("not_google_userId") || null;
    if (session) {
      localStorage.setItem("not_google_access_token", session.accessToken);
      localStorage.setItem("not_google_userId", session.user.id);
    }
    if (!userId || !accessToken) {
      redirect(`/api/auth/signin?callback=${encodeURIComponent(process.env.NEXTAUTH_URL || "")}`);
    }
    //@ts-ignore
    fetchMails({ userId, accessToken }).then((emailMetadata): Email[] => setEmails(emailMetadata))
  }, [session?.accessToken]);

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
                variant={selectedCategory === Category.Important ? "ghost" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory(Category.Important)}
              >
                Important
              </Button>
              <Button
                variant={selectedCategory === Category.Promotions ? "ghost" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory(Category.Promotions)}
              >
                Promotions
              </Button>
              <Button
                variant={selectedCategory === Category.Social ? "ghost" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory(Category.Social)}
              >
                Social
              </Button>
              <Button
                variant={selectedCategory === Category.Marketing ? "ghost" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory(Category.Marketing)}
              >
                Marketing
              </Button>
              <Button
                variant={selectedCategory === Category.Spam ? "ghost" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory(Category.Spam)}
              >
                Spam
              </Button>
              <Button
                variant={selectedCategory === Category.Spam ? "ghost" : "outline"}
                onClick={() => setSelectedCategory(Category.General)}
                className="w-full justify-start"
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
                      {formatDateAsTime(email.date)}
                      <div className="text-sm text-gray-500 dark:text-gray-400">{formatDateAsTime(email.date)}</div>
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
