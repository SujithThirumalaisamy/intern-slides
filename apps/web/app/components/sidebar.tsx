import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import InboxIcon from "./icons/inbox-icon";
import SendIcon from "./icons/send-icon";
import FileIcon from "./icons/file-icon";
import Trash2Icon from "./icons/trash-2-icon";
import ArchiveIcon from "./icons/archive-icon";
import UsersIcon from "./icons/users-icon";
import { Category } from "../utils";
export default function Sidebar({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: Category | "All";
  setSelectedCategory: Dispatch<SetStateAction<Category | "All">>;
}) {
  const navLinks = [
    { href: "#", name: "Inbox", icon: InboxIcon },
    { href: "#", name: "Sent", icon: SendIcon },
    { href: "#", name: "Drafts", icon: FileIcon },
    { href: "#", name: "Trash", icon: Trash2Icon },
    { href: "#", name: "Archived", icon: ArchiveIcon },
    { href: "#", name: "Contacts", icon: UsersIcon },
  ];
  return (
    <nav className="flex-1 space-y-1 px-4 py-4">
      {navLinks.map((navLink) => {
        return (
          <Link
            href={navLink.href}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
            prefetch={false}
          >
            <navLink.icon className="h-5 w-5" />
            {navLink.name}
          </Link>
        );
      })}
      <div className="mt-4 border-t pt-4">
        <div className="mb-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          Filter by category
        </div>
        <div className="grid gap-2">
          <Button
            variant={selectedCategory === "All" ? "ghost" : "outline"}
            className="w-full justify-start"
            onClick={() => setSelectedCategory("All")}
          >
            All
          </Button>
          {Object.keys(Category).map((key, index) => {
            if (isNaN(Number(key))) {
              return (
                <Button
                  variant={
                    //@ts-ignore
                    selectedCategory === Category[key] ? "ghost" : "outline"
                  }
                  className="w-full justify-start"
                  //@ts-ignore
                  onClick={() => setSelectedCategory(Category[key])}
                >
                  {key}
                </Button>
              );
            }
          })}
        </div>
      </div>
    </nav>
  );
}
