import { ClapperboardIcon, Home, Newspaper, Popcorn, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Movie List",
    url: "#",
    icon: ClapperboardIcon,
  },
  {
    title: "Food & Drinks",
    url: "#",
    icon: Popcorn,
  },
  {
    title: "News & Updates",
    url: "#",
    icon: Newspaper,
  },
  {
    title: "Booking Management",
    url: "#",
    icon: Settings,
  },
]

// Submenu items.
const subItems = [
  {
    title: "About CineBook",
    url: "#",
  },
  {
    title: "FAQ",
    url: "#",
  },
  {
    title: "Contact Us",
    url: "#",
  },
]

export default function AppSidebar() {
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
                    <a
                      href={item.url}
                      className="flex items-center gap-3 !text-md py-6 font-roboto"
                    >
                      <item.icon className="!w-7 !h-7" />
                      <span className="!text-md font-poppins">{item.title}</span>
                      
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Separator className="border-1 my-2 w-[210px] mx-auto"></Separator>
              {subItems.map((subItems) => (
                <SidebarMenuItem key={subItems.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={subItems.url}
                      className="flex items-center gap-3 !text-md py-5"
                    >
                      <span className="!text-md font-serif">{subItems.title}</span>
                      
                    </a>
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
