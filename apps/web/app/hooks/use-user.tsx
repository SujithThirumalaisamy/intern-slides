import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function useUser() {
  const { data } = useSession();
  return data?.user;
}
