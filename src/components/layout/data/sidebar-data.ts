import {
  IconLayoutDashboard,
  IconPackages,
  IconRobot,
  IconTool,
  IconUsers,
} from "@tabler/icons-react";
import { TbCubeUnfolded } from "react-icons/tb";
import { type SidebarData } from "../types";

export const sidebarData: SidebarData = {
  user: {
    name: "reoring",
    email: "reoring@gmail.com",
    avatar: "/avatars/default.svg",
  },
  header: {
    logo_url: "/images/logo.png",
    brand_name: "Tasmil Finance",
    tagline: "Your supreme agent",
  },
  navGroups: [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: IconLayoutDashboard,
        },
      ],
    },
    {
      title: "AI Agents",
      items: [
        {
          title: "Explore Agent",
          url: "/explore-agent",
          icon: TbCubeUnfolded,
        },
        {
          title: "Custom Agent",
          icon: IconRobot,
          items: [
            {
              title: "Alice",
              url: "/custom-agent/alice",
              icon: IconRobot,
            },
            {
              title: "Blob",
              url: "/custom-agent/blob",
              icon: IconRobot,
            },
            {
              title: "Charlie",
              url: "/custom-agent/charlie",
              icon: IconRobot,
            },
            {
              title: "Delta",
              url: "/custom-agent/delta",
              icon: IconRobot,
            },
            {
              title: "Echo",
              url: "/custom-agent/echo",
              icon: IconRobot,
            },
            {
              title: "Foxtrot",
              url: "/custom-agent/foxtrot",
              icon: IconRobot,
            },
          ],
        },
        {
          title: "Defi Agent",
          url: "/defi-agent",
          icon: IconTool,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "Community",
          url: "/community",
          icon: IconUsers,
        },
      ],
    },
    {
      title: "Finance",
      items: [
        {
          title: "Portfolio",
          url: "/portfolio",
          icon: IconPackages,
        },
      ],
    },
  ],
};
