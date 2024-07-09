// @flow strict
"use client";
import { useEffect, useRef, useState } from "react";

function ReactPopover({
  children,
  content,
  trigger = "click",
  placement = "top",
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  trigger?: "hover" | "click";
  placement?: "top" | "bottom" | "left" | "right";
}) {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<any>(null);
  let myPlacement = "";

  const handleMouseOver = () => {
    if (trigger === "hover") {
      setShow(true);
    }
  };

  const handleMouseLeft = () => {
    if (trigger === "hover") {
      setShow(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShow(false);
      }
    }

    if (show) {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [show, wrapperRef]);

  switch (placement) {
    case "top":
      myPlacement = ("bottom-[100%]");
      break;
    case "bottom":
      myPlacement = ("top-[100%]");
      break;
    case "left":
      myPlacement = ("right-[105%] top-[-100%]");
      break;
    case "right":
      myPlacement = ("left-[105%]  top-[-100%]");
      break;
  
    default:
      break;
  }

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeft}
      className="w-fit h-fit relative flex justify-center"
    >
      <div onClick={() => setShow(!show)}>{children}</div>
      <div
        hidden={!show}
        className={`"min-w-fit h-fit absolute ${myPlacement} z-50 transition-all"`}
      >
        <div className="rounded p-3 mb-[10px]">
          {content}
        </div>
      </div>
    </div>
  );
}

export default ReactPopover;
