import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { ROLES } from "./constant/roles";

export default async function proxy(request: NextRequest){
const pathname = request.nextUrl.pathname;
let isAuthenticated= false;
let isAdmin=false
const {data} = await userService.getSession() 
if(data){
    isAuthenticated=true;
    isAdmin= data?.user.role === ROLES.admin
}
if(!isAuthenticated){
    return NextResponse.redirect(new URL("/login", request.url))
}
if(!isAdmin && pathname.startsWith("/admin-dashboard")){
    return NextResponse.redirect(new URL("/dashboard", request.url))
}
if(isAdmin && pathname.startsWith("/dashboard")){
    return NextResponse.redirect(new URL("/admin-dashboard", request.url))
}
return NextResponse.next()
}
export const config= {
    matcher:[
        "/dashboard", "/dashboard/:path*","/admin-dashboard", "/admin-dashboard/:path*"
    ]
}