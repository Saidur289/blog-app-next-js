import { env } from "@/env"

const API_URL= env.API_URL

interface ServiceOptions{
    cache?: RequestCache;
    revalidate?: number;
}
interface GetBlogsParams{
    isFeatured?: boolean;
    search?: string;
}
export const blogService = {
    getBlog : async function (params?: GetBlogsParams, options?: ServiceOptions){
      try {
      const url = new URL(`${API_URL}/posts`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), config);

      const data = await res.json();

      // This is an example
      //   if(data.success) {
      //     return
      //   }

      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
    },
    getPostById: async function(id: string){
      try {
        const res = await fetch(`${API_URL}/posts/${id}`)
      const data = await res.json()
      return {data: data, error: null}
      } catch (error) {
       console.error(error) ;
       return {data: null,error: {msg: "wrong in get post by id function"}}
      }
    }
}