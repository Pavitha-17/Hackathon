import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  List,
  ListItemAvatar,
  Avatar,
  IconButton,
  InputBase,
  Badge,
  Typography,
  Button,
  Box,
  ListItemButton,
} from "@mui/material";
import { Search, Chat, MoreVert, Archive, Send } from "@mui/icons-material";

const BG = "#111b21";
const PANEL = "#202c33";
const HOVER = "#202c33";
const SELECTED = "#2a3942";
const BORDER = "#2a3942";
const BRAND = "#00a884";

const nowTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function ChatApp({clicked}) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("chats");
    if (saved) return JSON.parse(saved);
    const seed = [
      {
        id: 1,
        name: "Me (You)",
        lastMessage: "",
        time: "Yesterday",
        unread: 2,
        avatar: "https://i.pravatar.cc/40?img=1",
        archived: false,
      },
      {
        id: 2,
        name: "Friend 1",
        lastMessage: "",
        time: "24/01/2025",
        unread: 0,
        avatar: "https://i.pravatar.cc/40?img=2",
        archived: false,
      },
      {
        id: 3,
        name: "Group 1",
        lastMessage: "",
        time: "9:36 AM",
        unread: 1,
        avatar: "https://i.pravatar.cc/40?img=3",
        archived: false,
        group: true,
      },
      {
        id: 4,
        name: "Friend 2",
        lastMessage: "",
        time: "9:33 AM",
        unread: 0,
        avatar: "https://i.pravatar.cc/40?img=4",
        archived: false,
      },
      {
        id: 5,
        name: "Group 2",
        lastMessage: "",
        time: "7:14 AM",
        unread: 0,
        avatar: "https://i.pravatar.cc/40?img=5",
        archived: true,
      },
    ];
    const now = Date.now();
    return seed.map((c, i) => ({ ...c, updatedAt: now - (seed.length - i) * 1000 }));
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("messages");
    return saved ? JSON.parse(saved) : {};
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
    localStorage.setItem("messages", JSON.stringify(messages));
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats, messages, selectedId]);

  const filteredChats = useMemo(() => {
    let filtered = chats.filter((c) => !c.archived);
    // Apply tab filters
    if (activeTab === "Unread") filtered = filtered.filter((c) => c.unread > 0);
    if (activeTab === "Groups") filtered = filtered.filter((c) => c.group);
    // Add favourites logic later if needed
    // Search filter
    return filtered
      .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  }, [chats, search, activeTab]);

  const selectedChat = useMemo(
    () => chats.find((c) => c.id === selectedId) || null,
    [chats, selectedId]
  );

  const openChat = (chatId) => {
    setSelectedId(chatId);
    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, unread: 0 } : c))
    );
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    const newMsg = {
      id: Date.now(),
      text: message.trim(),
      time: nowTime(),
      sender: "You",
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg],
    }));

    setChats((prev) =>
      prev.map((c) =>
        c.id === selectedChat.id
          ? {
              ...c,
              lastMessage: newMsg.text,
              time: newMsg.time,
              unread: 0,
              updatedAt: Date.now(),
            }
          : c
      )
    );

    setMessage("");
  };

  return (
    <div className="flex h-screen text-white font-sans bg-[#1f2225]">
{clicked &&
      (<div className="w-80 flex flex-col" style={{ borderRight: `1px solid ${BORDER}` }}>
        {/* Header */}
        <div className="p-3 flex items-center justify-between">
          <Typography sx={{ fontWeight: "bold" }}>WhatsApp</Typography>
          <div className="flex space-x-2">
            <IconButton sx={{ color: "white" }}>
              <Chat />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <MoreVert />
            </IconButton>
          </div>
        </div>

        {/* Search */}
        <Box sx={{ px: 2, pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: PANEL,
              borderRadius: 2,
              border: `1px solid ${BORDER}`,
              px: 1.5,
              py: 0.5,
              "&:focus-within": {
                borderColor: BRAND,
                boxShadow: `0 0 0 2px ${BRAND}33`,
              },
            }}
          >
            <Search className="mr-2" style={{ color: "#8696a0" }} />
            <InputBase
              placeholder="Search or start a new chat"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ color: "#e9edef", "::placeholder": { color: "#8696a0" }, width: "100%" }}
            />
          </Box>
        </Box>

        {/* Tabs */}
        <div className="px-3 py-2 flex space-x-2 text-sm">
          {["All", "Unread", "Favourites", "Groups"].map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                activeTab === tab
                  ? "border border-[#00a884] text-[#00a884]"
                  : "border border-transparent text-gray-400 hover:bg-[#202c33]"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Archived */}
        <div
          className="px-3 py-2 text-sm flex justify-between items-center"
          style={{ color: "#8696a0" }}
        >
          <span>Archived</span>
          <IconButton
            size="small"
            onClick={() => {
              const first = chats.find((c) => c.archived) || chats[0];
              if (first) {
                setChats((prev) =>
                  prev.map((c) =>
                    c.id === first.id ? { ...c, archived: !c.archived } : c
                  )
                );
              }
            }}
          >
            <Archive style={{ color: "#8696a0" }} />
          </IconButton>
        </div>

        {/* Chat List */}
        <List className="flex-1 overflow-y-auto px-1">
          {filteredChats.map((chat) => (
            <ListItemButton
              key={chat.id}
              onClick={() => openChat(chat.id)}
              selected={chat.id === selectedId}
              sx={{
                alignItems: "flex-start",
                py: 1,
                px: 2,
                borderRadius: 2,
                mb: 0.5,
                transition: "background-color .15s",
                "&:hover": { backgroundColor: HOVER },
                "&.Mui-selected": { backgroundColor: SELECTED },
                "&.Mui-selected:hover": { backgroundColor: SELECTED },
              }}
            >
              <ListItemAvatar sx={{ minWidth: 48 }}>
                <Badge
                  badgeContent={chat.unread}
                  color="error"
                  overlap="circular"
                  invisible={chat.unread === 0}
                  sx={{
                    "& .MuiBadge-badge": {
                      background: "#25d366",
                      color: "#0b141a",
                      fontWeight: 700,
                      fontSize: 11,
                      minWidth: 18,
                      height: 18,
                    },
                  }}
                >
                  <Avatar
                    src={chat.avatar}
                    alt={chat.name}
                    sx={{ border: `1px solid ${BORDER}`, width: 40, height: 40 }}
                  />
                </Badge>
              </ListItemAvatar>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box className="flex items-center">
                  <Typography noWrap sx={{ fontWeight: 600, flex: 1, color: "#e9edef" }}>
                    {chat.name}
                  </Typography>
                  <Typography
                    sx={{ color: "#8696a0", fontSize: 12, ml: 1, whiteSpace: "nowrap" }}
                  >
                    {chat.time}
                  </Typography>
                </Box>
                <Typography noWrap sx={{ color: "#8696a0", fontSize: 13, mt: 0.25, pr: 1 }}>
                  {chat.lastMessage}
                </Typography>
              </Box>
            </ListItemButton>
          ))}
        </List>
      </div>)}

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Header */}
            <div
              className="p-3 flex justify-between items-center"
              style={{ borderBottom: `1px solid ${BORDER}`,backgroundColor: '#1f2225',width:'984px' }}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <Avatar
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                  sx={{ border: `1px solid ${BORDER}` }}
                />
                <div className="min-w-0">
                  <Typography variant="subtitle1" sx={{ color: "#e9edef", fontWeight: 600 }} noWrap>
                    {selectedChat.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#8696a0" }}>
                    {selectedChat.group ? "Group" : "Online"}
                  </Typography>
                </div>
              </div>
              <IconButton>
                <MoreVert className="text-white" />
              </IconButton>
            </div>

            {/* Messages */}
            <div
              className="flex-1 p-4 overflow-y-auto flex flex-col"
              style={{
                backgroundColor: '#1f2225',width:'984px',
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              {(messages[selectedChat.id] || []).map((msg) => {
                const mine = msg.sender === "You";
                return (
                  <div key={msg.id} className={`mb-2 ${mine ? "text-right" : "text-left"}`}>
                    <div
                      className={`inline-block p-2 rounded-lg max-w-[70%] break-words`}
                      style={{
                        backgroundColor: '#1f2225',width:'984px',
                        color: mine ? "#fff" : "#e9edef",
                        width:'984px'
                      }}
                    >
                      <span>{msg.text}</span>
                      <div className="text-xs mt-1" style={{ color: "#8696a0" }}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 flex items-center"
              style={{ backgroundColor: '#1f2225',width:'984px', borderTop: `1px solid ${BORDER}` }}
            >
              <InputBase
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 rounded-lg px-3 py-2"
                sx={{
                  color: "#e9edef",
                  bgcolor: "#2a3942",
                  "::placeholder": { color: "#8696a0" },
                }}
                inputProps={{ "aria-label": "message input" }}
              />
              <Button type="submit" sx={{ ml: 1, minWidth: 0, color: BRAND }}>
                <Send />
              </Button>
            </form>
          </>
        ) : (
          <div
            className="flex-1 flex items-center justify-center"
            style={{ color: "#8696a0", backgroundColor: '#1f2225',width:'984px' }}
          >
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
