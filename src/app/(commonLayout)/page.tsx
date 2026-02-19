import { blogService } from "@/services/blog.service";
import { BlogPost } from "../types";
import BlogCard from "@/components/modules/authentication/BlogPage";


export default async function Home() {
  // const {data} = await userService.getSession()
  // console.log(data, "hello");
  const {data }= await blogService.getBlog({
    isFeatured: false,
    
  },
  {
   revalidate: 10
  }
)
  // console.log(data.data.data, "data of blog");
  return (
    <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-6">

       {
        data?.data?.data?.map((post: BlogPost) => (<BlogCard post={post} key={post.id}/>))
      }
      
     
     
     
    </div>
  );
}
