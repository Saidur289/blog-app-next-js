"use server"
import { blogService } from "@/services/blog.service"
import { BlogData } from "@/types"

export const getBlog = async () => {
    return await blogService.getBlog()
}
export const createBlog = async(data: BlogData)=> {
    return await blogService.createPost(data)
}