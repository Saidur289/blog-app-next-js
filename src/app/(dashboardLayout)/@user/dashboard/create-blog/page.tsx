import CreateBlogFormServer from '@/components/modules/user/createBlog/CreateBlogFormServer'
import { blogService } from '@/services/blog.service'
import { userService } from '@/services/user.service';


export default async function CreateBlogPage() {
    const {data: session} = await userService.getSession()
    console.log(session.user.role, "hello");
    const {data} = await blogService.getBlog()
    // console.log(data);
  return (
    <div className='h-[calc(100vh-100px)] flex flex-col items-center justify-center'>
        <CreateBlogFormServer></CreateBlogFormServer>
        {data.data.data.map((blog) =>(<p key={blog.id}>{blog.title}</p>))}
    </div>
  )
}
