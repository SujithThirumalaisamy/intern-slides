"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Category, EmailType, fetchMails } from "./utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Button } from "@repo/ui/components/ui/button";
import Topbar from "./components/topbar";
import EmailItem from "./components/email";
import Sidebar from "./components/sidebar";

export default function Home() {
  const { data: session, status } = useSession();
  if (status !== "authenticated" && status !== "loading") {
    redirect(
      `/api/auth/signin?callback=${encodeURIComponent(process.env.NEXTAUTH_URL || "")}`
    );
  }

  const [emails, setEmails] = useState<EmailType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All"
  );
  const filteredEmails =
    selectedCategory === "All"
      ? emails
      : emails.filter((email) => email.category === selectedCategory);

  useEffect(() => {
    var accessToken = localStorage.getItem("not_google_access_token") || null;
    var userId = localStorage.getItem("not_google_userId") || null;
    if (session) {
      localStorage.setItem("not_google_access_token", session.accessToken);
      localStorage.setItem("not_google_userId", session.user.id);
    }
    if (!userId || !accessToken) return;
    fetchMails({ userId, accessToken }).then((fetchedMails): EmailType[] =>
      //@ts-ignore
      setEmails(fetchedMails)
    );
  }, [session?.accessToken]);

  const handleSignOut = () => signOut();
  
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="hidden w-64 flex-col border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-900 md:flex">
        <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-800">
          <Link href="#" className="font-bold" prefetch={false}>
            Not Gmail
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <img
                  src={session?.user.image || ""}
                  width="32"
                  height="32"
                  className="rounded-full"
                  alt="Avatar"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {session?.user.name || "Forbbiden User!"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <div className="grid gap-4 p-4 md:p-6">
            {filteredEmails.map((email) => (
              <EmailItem email={email} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
