import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { ClapperboardIcon, Home, Newspaper, Popcorn, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Menu items.
const user = JSON.parse(localStorage.getItem("user") || "{}");
const id = user?.id;
const items = [
  {
    title: "Home",
    url: `/${id}`,
    icon: Home,
  },
  {
    title: "Movie List",
    url: "/movielist",
    icon: ClapperboardIcon,
  },
  {
    title: "Food & Drinks",
    url: "/fooddrinks",
    icon: Popcorn,
  },
  {
    title: "News & Updates",
    url: "/newsupdates",
    icon: Newspaper,
  },
  {
    title: "Booking Management",
    url: "/reservations",
    icon: Settings,
  },
]

// Submenu items.
const subItems = [
  {
    title: "Offers & Promotions",
    url: "#",
  },
  {
    title: "Experiences",
    url: "#",
  },
  {
    title: "Gift Shop",
    url: "#",
  },
  {
    title: "FAQ",
    url: "/faq",
  },
  {
    title: "Contact Us",
    url: "#",
  },
]

export default function AppSidebar() {
  const location = useLocation()
  return (
    <Sidebar>
      <SidebarContent className="bg-jet-black text-gray-300">
        <SidebarGroup>
          {/* <SidebarGroupLabel className="text-lg mr-5 py-5">CineBook</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`flex items-center gap-3 !text-md py-6 font-roboto ${
                        location.pathname === item.url ? "text-white" : "text-gray-300"
                      }`}
                    >
                      <item.icon className="!w-7 !h-7" />
                      <span className="!text-md font-poppins">{item.title}</span>
                      
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Separator className="border-1 my-2 w-[210px] mx-auto"></Separator>
              {subItems.map((subItems) => (
                <SidebarMenuItem key={subItems.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={subItems.url}
                      className={`flex items-center gap-3 !text-md py-5 ${
                        location.pathname === subItems.url ? "text-white" : "text-gray-300"
                      }`}
                    >
                      <span className="!text-md font-poppins m-2">{subItems.title}</span>
                      
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
