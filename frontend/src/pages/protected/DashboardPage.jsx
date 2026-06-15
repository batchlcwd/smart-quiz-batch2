import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useTheme } from "next-themes";
import {
  ArrowDownToDot,
  BookDashed,
  BrainCircuit,
  BrainCog,
  Home,
  UserKey,
  LogOut,
  LayoutDashboard,
  FileText,
  Settings,
  Sun,
  Moon,
  ShieldCheck,
  User as UserIcon,
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
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Outlet, useNavigate, useLocation } from "react-router";

const menuItems = [
  {
    title: "Home",
    icon: Home,
    link: "/",
  },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    link: "/dashboard",
  },
  {
    title: "New Feed",
    icon: BookDashed,
    link: "/dashboard/newfeed",
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
    link: "/dashboard",
  },
];

export default function DashboardPage() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  if (!user) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center min-h-screen bg-muted/20">
        <div className="p-4 bg-rose-500/10 rounded-full text-rose-500 border border-rose-500/20">
          <UserKey size={40} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Access Denied</h1>
        <p className="text-muted-foreground text-sm max-w-sm text-center">
          You are not logged in. Please log in to access your dashboard.
        </p>
        <Button onClick={() => navigate("/login")} className="mt-2">
          Go to Login
        </Button>
      </div>
    );
  }

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts.map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isRouteActive = (link) => {
    if (link === "/dashboard") {
      return location.pathname === "/dashboard" || location.pathname === "/dashboard/";
    }
    return location.pathname.startsWith(link);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/20 dark:bg-background">
        {/* Left Sidebar */}
        <Sidebar className="border-r border-border bg-card">
          <SidebarContent className="flex flex-col justify-between h-full py-4">
            
            <div className="space-y-6">
              {/* Brand Header */}
              <div className="px-6 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500 text-white shadow-md shadow-indigo-500/25">
                  <BrainCog size={22} className="animate-pulse" />
                </div>
                <div>
                  <h1 className="text-lg font-bold tracking-tight text-foreground">Quizify</h1>
                  <span className="text-[10px] font-medium text-indigo-500 uppercase tracking-widest block">Dashboard</span>
                </div>
              </div>

              <Separator className="bg-border/60" />

              {/* User Profile Info Card */}
              <div className="px-4">
                <div className="p-3.5 rounded-xl border border-border/80 bg-muted/40 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-inner">
                    {getInitials(user.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{user.email || "user@quizify.com"}</p>
                    <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded mt-1.5 ${
                      user.role?.name === "admin"
                        ? "bg-violet-500/10 text-violet-500 border border-violet-500/20"
                        : "bg-slate-500/10 text-slate-500 border border-slate-500/20"
                    }`}>
                      {user.role?.name === "admin" ? <ShieldCheck size={9} /> : <UserIcon size={9} />}
                      {user.role?.name || "Student"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sidebar Menu Groups */}
              <SidebarGroup className="px-4">
                <SidebarGroupLabel className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-2">
                  Main Menu
                </SidebarGroupLabel>

                <SidebarGroupContent>
                  <SidebarMenu className="gap-1">
                    {menuItems.map((item) => {
                      const active = isRouteActive(item.link);
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            onClick={() => navigate(item.link)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                              active
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15 hover:bg-indigo-600 hover:text-white"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            <item.icon size={16} />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}

                    {user.role?.name === "admin" && (
                      <>
                        <Separator className="my-2 bg-border/60" />
                        <SidebarGroupLabel className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-2 block">
                          Admin Controls
                        </SidebarGroupLabel>
                        
                        {adminMenuItems.map((item) => {
                          const active = isRouteActive(item.link);
                          return (
                            <SidebarMenuItem key={item.title}>
                              <SidebarMenuButton
                                onClick={() => navigate(item.link)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                                  active
                                    ? "bg-violet-600 text-white shadow-md shadow-violet-600/15 hover:bg-violet-600 hover:text-white"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                              >
                                <item.icon size={16} />
                                <span>{item.title}</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        })}
                      </>
                    )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </div>

            {/* Sidebar Footer Operations */}
            <div className="px-4 space-y-2.5">
              <Separator className="bg-border/60" />
              
              {/* Theme Toggle inside Sidebar */}
              <div className="flex items-center justify-between px-2 text-sm text-muted-foreground">
                <span>Display Theme</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="h-8 w-8 rounded-lg cursor-pointer hover:bg-muted"
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </Button>
              </div>

              {/* Logout button */}
              <Button
                variant="ghost"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="w-full flex items-center justify-start gap-3 px-3 py-2 text-sm font-medium text-rose-500 hover:bg-rose-500/10 hover:text-rose-500 rounded-lg cursor-pointer transition-colors"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </Button>
            </div>
            
          </SidebarContent>
        </Sidebar>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-h-screen">
          {/* Header Bar */}
          <header className="h-16 px-6 border-b border-border bg-card/40 backdrop-blur-md flex items-center gap-4 sticky top-0 z-10">
            <SidebarTrigger className="cursor-pointer" />
            <Separator orientation="vertical" className="h-4 bg-border" />
            <div className="flex-1 text-xs text-muted-foreground font-medium flex items-center gap-2">
              <span className="capitalize">{location.pathname.split("/").filter(Boolean)[0] || "Home"}</span>
              {location.pathname.split("/").filter(Boolean).length > 1 && (
                <>
                  <span>/</span>
                  <span className="font-semibold text-foreground capitalize">
                    {location.pathname.split("/").filter(Boolean).slice(1).join(" / ")}
                  </span>
                </>
              )}
            </div>
          </header>

          {/* Page Outlet Wrapper */}
          <div className="flex-1 p-6 md:p-8">
            <div className="rounded-2xl border border-border/80 bg-card p-6 md:p-8 shadow-sm min-h-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

