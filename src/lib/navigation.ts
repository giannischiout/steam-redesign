import {
  IconCompassFilled,
  IconDeviceDesktopFilled,
  IconDeviceGamepad2Filled,
  IconFlameFilled,
  IconHeartFilled,
  IconHome2Filled,
  IconLibraryFilled,
  IconSettingsFilled,
  IconTagsFilled,
  IconThumbUpFilled,
  IconUserFilled,
  type Icon,
} from "@tabler/icons-react";

export type NavItem = { href: string; label: string; Icon: Icon; count?: number };

const home = { href: "/", label: "Home", Icon: IconHome2Filled };
const library = { href: "/library", label: "Library", Icon: IconLibraryFilled };
const browse = { href: "/browse", label: "Browse", Icon: IconCompassFilled };
const wishlist = { href: "/wishlist", label: "Wishlist", Icon: IconHeartFilled, count: 10 };

/** At the bottom of the original sidebar only. The other looks use the floating button. */
export const settingsItem: NavItem = { href: "/settings", label: "Settings", Icon: IconSettingsFilled };

/** Groups shown at the top of the sidebar. */
export const sidebarGroups: NavItem[][] = [
  [home, library],
  [
    browse,
    { href: "/recommendations", label: "Recommendations", Icon: IconThumbUpFilled },
    { href: "/categories", label: "Categories", Icon: IconTagsFilled },
    { href: "/hardware", label: "Hardware", Icon: IconDeviceDesktopFilled },
    { href: "/ways-to-play", label: "Ways to play", Icon: IconDeviceGamepad2Filled },
    { href: "/special-sections", label: "Special sections", Icon: IconFlameFilled },
  ],
  [wishlist, { href: "/friends", label: "Friends", Icon: IconUserFilled }],
];

export const bottomBarItems: NavItem[] = [home, browse, wishlist, library];

/** Names in the top bar, and in the footer on phone. */
export const topLinks = [
  { href: "/", label: "Store" },
  { href: "/community", label: "Community" },
  { href: "/news", label: "News" },
  { href: "/chat", label: "Chat" },
  { href: "/support", label: "Support" },
];

const toLink = ({ href, label }: NavItem) => ({ href, label });

export const footerLinks = [
  ...topLinks.slice(1),
  ...sidebarGroups.slice(1).flat().map(toLink),
  { href: "/install", label: "Install Steam" },
  { href: "/settings", label: "Settings" },
];
