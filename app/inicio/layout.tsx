"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const paths = usePathname();
    const pathNames = paths.split('/').filter( path => path).map(path => 
        path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    );

    return (
        <SidebarProvider>
            <AppSidebar />
                <SidebarInset style={{overflow: "hidden"}}>
                    <header className="flex h-16 shrink-0 items-center gap-2 ">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                                />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {pathNames.map((name, index) => (
                                        <React.Fragment key={index}>
                                            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                                                <BreadcrumbLink href="#">
                                                    {name}
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            {index < pathNames.length - 1 && (
                                                <BreadcrumbSeparator className="hidden md:block" />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <div className="flex flex-col px-[4rem]">
                        { children }  
                    </div>
                    {/* <Toaster richColors /> */}
                </SidebarInset>
        </SidebarProvider>
    )
  }