import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export default   function CreateBlogFormServer() {
  const API_URL= env.API_URL

  const createBlog = async(formdata:FormData) => {
    "use server"
    const cookieStore = await cookies()
    const title = formdata.get("title") as string
    const content = formdata.get("content") as string
    const tags = formdata.get("tags") as string
    const blogData = {
      title,
      content,
      tags: tags.split(",").map((item) => item.trim()).filter((item) => item !== " ")
    }
    // console.log(blogData, "hello");
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString()
      },
      body: JSON.stringify(blogData)
    })
    // console.log(res);
    if(res.ok){
      revalidateTag("blogPosts", "max")
    }
  }
  return (
    <Card className="w-full mx-auto">
        <CardHeader>
        <CardTitle>Create Blog</CardTitle>
        <CardDescription>Your blog card description</CardDescription>
    </CardHeader>
    <CardContent>
        <form id="blog-form" action={createBlog}>
          <FieldGroup>
             <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="Blog Title"
                required
              />
            </Field>
             <Field>
              <FieldLabel htmlFor="content">Content</FieldLabel>
              <Input
                id="content"
                name="content"
                placeholder="content"
                required
              />
            </Field>
             <Field>
              <FieldLabel htmlFor="tags">Tags (comma separated)</FieldLabel>
              <Input
                id="tags"
                name="tags"
                placeholder="Tags"
                required
              />
            </Field>
          </FieldGroup>
        </form>
    </CardContent>
    <CardFooter>
        <Button className="w-full" form="blog-form" type="submit">Submit</Button>
    </CardFooter>
    </Card>
  )
}
