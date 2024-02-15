import { AiOutlineDashboard } from "react-icons/ai";
import { FiUser, FiUserPlus, FiUsers } from "react-icons/fi";
import { TbCategory, TbTablePlus } from "react-icons/tb";
import { MdFormatListBulleted, MdOutlineCategory } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { BsCart4, BsCartPlus } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export const SidebarData: any[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: AiOutlineDashboard,
    children: [],
  },
  {
    name: "Users",
    icon: FiUsers,
    isChildOpen: false,
    children: [
      {
        name: "User List",
        path: "/users/user-list",
        icon: FiUser,
      },
      {
        name: "Add User",
        path: "/users/user-add",
        icon: FiUserPlus,
      },
    ],
  },
  {
    name: "Products",
    icon: HiOutlineShoppingBag,
    isChildOpen: false,
    children: [
      {
        name: "Products List",
        path: "/products/product-list",
        icon: BsCart4,
      },
      {
        name: "Add Product",
        path: "/products/product-add",
        icon: BsCartPlus,
      },
    ],
  },
  {
    name: "Categories",
    icon: MdOutlineCategory,
    isChildOpen: false,
    children: [
      {
        name: "Categories List",
        path: "/categories/category-list",
        icon: TbCategory,
      },
      {
        name: "Add Category",
        path: "/categories/category-add",
        icon: TbTablePlus,
      },
    ],
  },
  {
    name: "Contact Support",
    icon: GoChecklist,
    path: "/contact-support",
    isChildOpen: false,
    children: [],
  },
];
