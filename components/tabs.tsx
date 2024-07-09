"use client";

import React, { ReactElement, useState } from "react";
import { nanoid } from "nanoid";

const selectedStyle = "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500";
const unselectedStyle = "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";

function TabTitle({
  title,
  setSelectedTab,
  selectedTab,
  index,
}: {
  title: string;
  index: number;
  selectedTab: number;
  setSelectedTab: (index: number) => void;
}) {
  const style = selectedTab === index ? selectedStyle : unselectedStyle;

  return (
    <li className="me-2">
      <button onClick={() => setSelectedTab(index)} className={style}>
        {title}
      </button>
    </li>
  );
}

export function Tab({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

export function Tabs({ children }: { children: ReactElement[] }) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          {children.map((item, index) => (
            <TabTitle
              key={nanoid()}
              title={item.props.title}
              index={index}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ))}
        </ul>
      </div>
      {children[selectedTab]}
    </div>
  );
}
