export interface SidebarElement {
  items: SidebarItem[];
  title?: string;
}

export interface SidebarItem {
  name: string;
  icon?: string | object;
  to?: string;
}
