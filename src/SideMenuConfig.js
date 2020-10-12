import React from "react";

import {
  UnorderedListOutlined,
  FileTextOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

const menuConfig = [
  {
    name: "Transports",
    url: "/transports",
    icon: <UnorderedListOutlined />,
  },
  {
    name: "Create",
    icon: <FileTextOutlined />,
    subItems: [
      {
        name: "Transport",
        url: "/create/transport",
      },
      {
        name: "Something",
        url: "/create/something",
      },
    ],
  },
  {
    name: "Documentation",
    icon: <PlusCircleOutlined />,
    subItems: [
      {
        name: "Functional",
        subItems: [
          {
            name: "Docs1",
            url: "/documentation/functional",
          },
          {
            name: "Docs2",
            url: "/documentation/whaat",
          },
        ],
      },
      {
        name: "Technical",
        url: "/documentation/technical",
      },
    ],
  },
];

export default menuConfig;
