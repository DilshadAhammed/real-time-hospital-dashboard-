import React, { useState } from "react";
import { Menu, MenuItem, MenuItems, MenuButton } from "@headlessui/react";
import { MagnifyingGlassIcon, BellIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Team from "./Team";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function Dashboard() {
  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ];
  const [open, setopen] = useState(false);

  return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className=" bg-indigo-700 text-white flex flex-col overflow-hidden" style={{width: open ? "16rem" : "6rem" }}>
          <div className="flex items-center justify-end h-16 border-b border-indigo-600 cursor-pointer" onClick={(e) => setopen(!open)}>
            {/* Logo */}
            <Bars3Icon className="size-5 mr-6"/>
          </div>
          {/* Navigation */}
          <nav className="mt-10">
            <ul>
              <li className="px-4 py-2 bg-indigo-800 rounded-md mt-2">
                <a href="#" className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h18M3 7h18M3 11h18M3 15h18M3 19h18"
                    />
                  </svg>
                  <Link to="/dash">Dashboard</Link>
                </a>
              </li>
              <li className="px-4 py-2 hover:bg-indigo-600 rounded-md mt-2">
                <a href="#" className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 3.13a4 4 0 010 7.75M12 14v2m-2 2h4m4 4H6a2 2 0 01-2-2V7a2 2 0 012-2h1"
                    />
                  </svg>
                  <Link to="team">Team</Link>
                </a>
              </li>
              <li className="px-4 py-2 hover:bg-indigo-600 rounded-md mt-2">
                <a href="#" className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>Projects</span>
                </a>
              </li>
              <li className="px-4 py-2 hover:bg-indigo-600 rounded-md mt-2">
                <a href="#" className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 11l7-7 7 7M5 19l7-7 7 7"
                    />
                  </svg>
                  <span>Calendar</span>
                </a>
              </li>
              <li className="px-4 py-2 hover:bg-indigo-600 rounded-md mt-2">
                <a href="#" className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 4v16h14V4H5z"
                    />
                  </svg>
                  <span>Documents</span>
                </a>
              </li>
              <li className="px-4 py-2 hover:bg-indigo-600 rounded-md mt-2">
                <a href="#" className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <span>Reports</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <header className="flex items-center space-x-4 justify-end pb-4 border-b border-gray-200">
            {/* Search Bar */}
            <div className="relative ">
              <input
                type="text"
                className=" border-gray-200 rounded-full py-2 px-4 pl-10 text-sm focus:outline-none"
                placeholder="Search..."
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <button className="relative">
                <BellIcon className="size-6" />
              </button>

              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </header>

          {/* Content Area */}
          <div className="bg-white h-96 rounded-lg border border-gray-300 mt-6">
            <Routes>
              <Route path="/team" element={<Team />} />
            </Routes>
          </div>
        </div>
      </div>
  );
}
