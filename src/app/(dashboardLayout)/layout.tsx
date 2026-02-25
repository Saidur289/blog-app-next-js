import { AppSidebar } from '@/components/layout/app-sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ROLES } from '@/constant/roles'
import { userService } from '@/services/user.service'
import { redirect } from 'next/navigation'



export const dynamic = "force-dynamic";
export default async function DashboardLayout({
  user,
  admin
}: Readonly<{
  children: React.ReactNode;
  user: React.ReactNode;
  admin: React.ReactNode
}>) {
  const {data} = await userService.getSession()
if (!data || !data.user) {
  return redirect("/login");
}
 const userInfo = data.user
    

  return (

    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
         
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === ROLES.admin? admin : user}
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
