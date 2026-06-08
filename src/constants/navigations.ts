import {
  LayoutDashboard,
  Stethoscope,
  Microscope,
  Syringe,
  FileBarChart2,
  FileUser,
  UsersRound,
  ClipboardPlus,
  Tablets,
  ShieldPlus,
  BriefcaseMedical
} from "lucide-react"

export const NAVIGATION_ITEMS = [
  {
    label: "Dashboard",
    href: "/manager/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Bác sĩ",
    href: "/manager/doctors",
    icon: Stethoscope,
  },
  {
    label: "Bệnh lý",
    href: "/manager/diseases",
    icon: Microscope,
  },
  {
    label: "Tác nhân gây bệnh",
    href: "/manager/pathogens",
    icon: ClipboardPlus,
  },
  {
    label: "Tiêu chí ICU",
    href: "/manager/icu-criteria",
    icon: ClipboardPlus,
  },
  {
    label: "Kháng sinh",
    href: "/manager/antibiotics",
    icon: Syringe,
  },
  {
    label: "Phổ kháng sinh",
    href: "/manager/antibiotic-spectra",
    icon: Tablets,
  },
  {
    label: "Nguy cơ",
    href: "/manager/resistance-risks",
    icon: ShieldPlus,
  },
  {
    label: "Phác đồ điều trị",
    href: "/manager/treatment-protocols",
    icon: ClipboardPlus,
  },
  {
    label: "Báo cáo",
    href: "/manager/reports",
    icon: FileBarChart2,
  },
]

export const DOCTOR_NAVIGATION_ITEMS = [
  {
    label: "Bệnh nhân",
    href: "/doctor/patients",
    icon: UsersRound,
  },
  {
    label: "Mẫu chẩn đoán",
    href: "/doctor/clinical-form",
    icon: FileUser,
  },
  {
    label: "Kháng sinh",
    href: "/doctor/antibiotics",
    icon: BriefcaseMedical,
  },
  {
    label: "Phác đồ điều trị",
    href: "/doctor/treatment-protocols",
    icon: ClipboardPlus,
  },
  {
    label: "Báo cáo",
    href: "/doctor/history",
    icon: FileBarChart2,
  },
]

export const SIDEBAR_WIDTH = "280px"