import React, { useState, useEffect } from "react";

import { Menu } from "antd";

import { Link, useLocation } from "react-router-dom";

import {
  UnorderedListOutlined,
  FileTextOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const menuLinks = [
  {
    name: "SubMenu",
    icon: <FileTextOutlined />,
    subItems: [
      {
        name: "SubMenuItem1",
        url: "/subitem1",
      },
      {
        name: "SubMenuItem1",
        url: "/subitem2",
      },
    ],
  },
  {
    name: "SubMenu2",
    icon: <PlusCircleOutlined />,
    subItems: [
      {
        name: "SubMenuItem21",
        url: "/subitem21",
      },
      {
        name: "SubMenuItem21",
        url: "/subitem22",
      },
    ],
  },
  {
    name: "MenuItem1",
    url: "/menuitem1",
    icon: <UnorderedListOutlined />,
  },
  {
    name: "MenuItem2",
    url: "/menuitem2",
    icon: <UnorderedListOutlined />,
  },
];

const SiteMenu = ({ defaultOpenKeys, collapsed }) => {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState([]);
  const [preOpenKeys, setPreOpenKeys] = useState([]);

  const rootKeys = ["SubMenu", "SubMenu2"];

  useEffect(() => {
    console.log("openkeys: ", openKeys);
  }, [openKeys]);

  useEffect(() => {
    console.log("location pathname is: ", location.pathname);
    if (!menuLinks.find((item) => item.url === location.pathname)) {
      if (
        menuLinks.find(
          (item) =>
            item.subItems &&
            item.subItems.find((item) => {
              return item.url === location.pathname;
            })
        ) &&
        !collapsed
      ) {
        const currentSubItem = menuLinks.find(
          (item) =>
            item.subItems &&
            item.subItems.find((item) => item.url === location.pathname)
        );
        console.log("setting openKeys: " + currentSubItem.name);
        setOpenKeys([currentSubItem.name]);
      }
      return;
    }
  }, [menuLinks, location.pathname]);

  useEffect(() => {
    console.log("useEffect collapsed");
    if (collapsed) {
      setPreOpenKeys([...openKeys]);
      setOpenKeys([]);
    } else {
      setOpenKeys(preOpenKeys);
    }
  }, [collapsed]);

  // Open only one submenu at a time and make sure to open the right one when expanding
  const onOpenChange = (items) => {
    console.log("on open change");
    const latestOpenKey = items.find((key) => openKeys.indexOf(key) === -1);
    if (rootKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(items);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [defaultOpenKeys]);
    }
    if (collapsed === true) {
      setPreOpenKeys(items);
    }
  };

  const onSelectSubMenus = (v) => {
    console.log("go gog");
    console.log(v);
    if (collapsed) {
      setOpenKeys([]);
    }
  };

  return (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={[location.pathname]}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    >
      {menuLinks.map((link) =>
        link.subItems ? (
          <SubMenu
            key={link.name}
            title={link.name}
            icon={link.icon}
            onClick={onSelectSubMenus}
          >
            {link.subItems.map((subItem) => (
              <Menu.Item key={subItem.url}>
                <Link to={subItem.url}>{subItem.name}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item key={link.url} icon={link.icon}>
            <Link to={link.url}>{link.name}</Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

export default SiteMenu;

// based on https://codesandbox.io/s/sider-demo-forked-zyyj2
