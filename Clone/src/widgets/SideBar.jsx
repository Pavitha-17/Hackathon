import * as React from "react";
import {
  Box,
  Drawer,
  IconButton,
  Tooltip,
  Badge,
  Avatar,
  Divider,
} from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import RadarOutlinedIcon from "@mui/icons-material/RadarOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from 'react-router-dom';

const NAV_WIDTH = 62;

const navTop = [
  { id: "inbox", label: "Chat", icon: <ArticleOutlinedIcon />, badge: 2 },
  { id: "status", label: "Status", icon: <RadarOutlinedIcon /> },
  { id: "chat", label: "Group", icon: <ChatBubbleOutlineOutlinedIcon /> },
  { id: "team", label: "Community", icon: <Groups2OutlinedIcon /> },
];

export default function CompactSidebar() {
  const navigate = useNavigate();
  const [active, setActive] = React.useState("inbox");

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: NAV_WIDTH,
          border: "none",
          boxShadow: "none",
          backgroundColor: "transparent",
          borderRight: "1px solid #3f3f46",
        },
      }}
      sx={{ width: NAV_WIDTH, flexShrink: 0 }}
    >
      <Box className="h-screen w-full flex flex-col justify-between bg-[#1f2225] text-zinc-400">
        <Box className="flex flex-col items-center gap-3 pt-3">
          {navTop.map((item) => {
            const isActive = active === item.id;
            const iconBtn = (
              <IconButton
                onClick={() => {
                  setActive(item.id);
                  if (item.id === "status") navigate("/status");
                  else if (item.id === "chat") navigate("/chat");
                  else if (item.id === "inbox") navigate("/chat");
                }}
                className={[
                  "w-12 h-12",
                  "rounded-2xl",
                  "transition-all duration-200",
                  isActive
                    ? "bg-zinc-800/70 text-white"
                    : "hover:bg-zinc-800/60",
                ].join(" ")}
              >
                <span className={isActive ? "text-white" : "text-zinc-400"}>
                  {item.icon}
                </span>
              </IconButton>
            );

            return (
              <Tooltip key={item.id} title={item.label} placement="right">
                <div>
                  {item.badge ? (
                    <Badge
                      badgeContent={item.badge}
                      color="success"
                      overlap="circular"
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      {iconBtn}
                    </Badge>
                  ) : (
                    iconBtn
                  )}
                </div>
              </Tooltip>
            );
          })}

          <Divider className="w-10 self-center my-2 bg-zinc-700/60" />

          <Tooltip title="Activity" placement="right">
            <button
              onClick={() => setActive("ring")}
              className={[
                "relative w-12 h-12 rounded-2xl grid place-items-center",
                "hover:bg-zinc-800/60 transition-colors",
                active === "ring" ? "bg-zinc-800/70" : "",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute inset-2 rounded-full",
                  "before:content-[''] before:absolute before:inset-[-3px] before:rounded-full",
                  "before:[background:conic-gradient(from_var(--tw-rotate),#00a2ff,#8a2be2,#00a2ff)]",
                  "before:animate-spin-slow",
                  "after:content-[''] after:absolute after:inset-1 after:rounded-full after:bg-[#1f2225]",
                ].join(" ")}
              />
              <span className="relative z-10 w-2 h-2 rounded-full bg-zinc-300" />
            </button>
          </Tooltip>
        </Box>

        <Box className="flex flex-col items-center gap-3 pb-3">
          <Tooltip title="Settings" placement="right">
            <IconButton
              onClick={() => setActive("settings")}
              className={[
                "w-12 h-12 rounded-2xl transition-all duration-200",
                active === "settings"
                  ? "bg-zinc-800/70 text-white"
                  : "hover:bg-zinc-800/60",
              ].join(" ")}
            >
              <span
                className={
                  active === "settings" ? "text-white" : "text-zinc-400"
                }
              >
                <SettingsOutlinedIcon />
              </span>
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile" placement="right">
            <button
              onClick={() => setActive("profile")}
              className={[
                "w-12 h-12 rounded-4xl overflow-hidden ring-0 outline-none",
                "hover:ring-2 ring-zinc-600 transition-all duration-200",
                active === "profile" ? "ring-2 ring-zinc-600" : "",
              ].join(" ")}
            >
              <Avatar
                alt="You"
                src="https://i.pravatar.cc/80?img=12"
                sx={{ width: 48, height: 48, cursor: "pointer" }}
                onClick={()=>navigate('/profile')}
              />
            </button>
          </Tooltip>
        </Box>
      </Box>
    </Drawer>
  );
}
