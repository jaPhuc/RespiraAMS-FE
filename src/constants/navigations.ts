import {
  LayoutDashboard,
  Stethoscope,
  Microscope,
  Syringe,
  FileBarChart2,
} from "lucide-react"

export const NAVIGATION_ITEMS = [
  {
    label: "Dashboard",
    href: "/manager/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Doctors",
    href: "/manager/doctors",
    icon: Stethoscope,
  },
  {
    label: "Diseases",
    href: "/manager/diseases",
    icon: Microscope,
  },
  {
    label: "Antibiotics",
    href: "/manager/antibiotics",
    icon: Syringe,
  },
  {
    label: "Reports",
    href: "/manager/reports",
    icon: FileBarChart2,
  },
]

export const SIDEBAR_WIDTH = "280px"