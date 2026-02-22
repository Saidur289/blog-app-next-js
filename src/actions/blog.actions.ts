"use server"
import { blogService } from "@/services/blog.service"

export const getBlog = async () => {
    return await blogService.getBlog()
}