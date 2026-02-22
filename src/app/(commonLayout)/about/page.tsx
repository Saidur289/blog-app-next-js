// export const dynamic = "force-dynamic"
"use client"

import { getBlog } from "@/actions/blog.actions"
import { useEffect, useState } from "react"

export default  function AboutPage() {
  // throw new Error("error from about page")
  // await new  Promise(resolve => setTimeout(resolve, 4000))
  const [data, setData] = useState([])
  const [error, setError] = useState<{ message: string } | null>(null);
  useEffect(() => {
   ( async () => {
      const {data, error} = await getBlog()
      setData(data)
      setError(error)
    })()
  }, [])
  // console.log(data, error);
  return (
    <div>AboutPage</div>
  )
}
