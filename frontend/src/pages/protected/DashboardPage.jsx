import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import {
  ArrowDownToDot,
  ArrowUpRightFromCircleIcon,
  BookDashed,
  BrainCircuit,
  BrainCog,
  Home,
  UserKey,
  Users2,
} from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { Outlet, useNavigate } from "react-router";

const menuItems = [
  {
    title: "Home",
    icon: Home,
    link: "/",
  },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    link: "/dashboard/",
  },
  {
    title: "New Feed",
    icon: BookDashed,
    link: "/dashboard/newfeed",
  },
  {
    title: "Articles",
    icon: FileText,
  },
  {
    title: "Settings",
    icon: Settings,
    link: "/dashboard/settings",
  },
];

const adminMenuItems = [
  {
    title: "Add Quiz",
    icon: ArrowDownToDot,
    link: "/",
  },
  {
    title: "Generate Quiz",
    icon: BrainCircuit,
    link: "/dashboard/",
  },
];
export default function DashboardPage() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center mt-5">
        <UserKey size={50} />
        <h1 className="text-2xl font-semibold">You are not logged in</h1>
        <p>Please log in to access your dashboard</p>
        <a href="/login">Login</a>
      </div>
    );
  }
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Left Sidebar */}
        <Sidebar>
          <SidebarContent>
            <div className={"p-4 flex flex-col gap-1"}>
              <BrainCog size={40} />
              <h1 className="text-2xl font-semibold">Quizify</h1>
              <p className="text-sm">Welcome to dashboard</p>
              <p className="text-bold">{user.name}</p>
            </div>
            <Separator />
            <SidebarGroup>
              <SidebarGroupLabel>Main menu</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton onClick={() => navigate(item.link)}>
                        <item.icon size={18} />

                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}

                  <Separator />

                  {user.role.name == "admin" &&
                    adminMenuItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton onClick={() => navigate(item.link)}>
                          <item.icon size={18} />

                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                    >
                      <LogOut size={18} />

                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 bg-muted/40 p-6">
          <SidebarTrigger />
          <div
            className="
            rounded-xl
            bg-background
            shadow-sm
            min-h-full
            p-6
          "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
