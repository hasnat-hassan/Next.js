import Link from "next/link";
import React from "react";

const UserSidebar = () => {
  const menuItems = [
    {
      name: "Update Profile",
      url: "/me/update",
      icon: "fas fa-user",
    },
    {
      name: "Upload Avatar",
      url: "/me/update_avatar",
      icon: "fas fa-user-circle",
    },
    {
      name: "Update Password",
      url: "/me/update_password",
      icon: "fas fa-lock",
    },
  ];

  return (
    <div className="list-group mt-5 pl-4">
      {menuItems.map((menuItems, index) => (
        <Link
          key={index}
          href={menuItems.url}
          className="fw-bold list-group-item list-group-item-action active"
          aria-current="true"
        >
          <i className={`${menuItems.icon}`}></i>
          {menuItems.name}
        </Link>
      ))}
    </div>
  );
};

export default UserSidebar;
