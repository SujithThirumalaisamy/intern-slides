import Link from "next/link";
import React from "react";
import MenuIcon from "./icons/menu-icon";
import SearchIcon from "./icons/search-icon";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import CombineIcon from "./icons/combine-icon";

export default function Topbar() {
  return (
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
  );
}
