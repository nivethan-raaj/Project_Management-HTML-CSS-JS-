"use client";

import { useState } from "react";
import { useApp } from "@/lib/app-context";

export default function InboxPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead, deleteNotification } = useApp();
  const [activeTab, setActiveTab] = useState("all");

  const filteredItems = notifications.filter((n) => {
    if (activeTab === "unread") return !n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(210,20%,95%)]">Inbox</h1>
          <p className="text-sm text-[hsl(215,15%,55%)] mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="px-4 py-2 text-sm text-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,56%,0.08)] rounded-lg transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-[hsl(220,12%,20%)]">
        {[
          { key: "all", label: "All" },
          { key: "unread", label: `Unread (${unreadCount})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium -mb-px transition-colors ${
              activeTab === tab.key
                ? "text-[hsl(210,80%,56%)] border-b-2 border-[hsl(210,80%,56%)]"
                : "text-[hsl(215,15%,55%)] hover:text-[hsl(210,20%,85%)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-[hsl(220,15%,14%)] rounded-xl border border-[hsl(220,12%,20%)] overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-[hsl(215,15%,45%)]">
            <svg className="mx-auto mb-4" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
              <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
            </svg>
            <p className="text-base mb-1">No notifications</p>
            <p className="text-sm">{"You're all caught up!"}</p>
          </div>
        ) : (
          filteredItems.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 px-5 py-4 border-b border-[hsl(220,12%,20%)] transition-colors hover:bg-[hsl(220,15%,16%)] ${
                !notification.read ? "bg-[hsl(210,80%,56%,0.04)]" : ""
              }`}
            >
              {!notification.read && (
                <div className="w-2 h-2 rounded-full bg-[hsl(210,80%,56%)] mt-2 flex-shrink-0" />
              )}
              {notification.read && <div className="w-2 flex-shrink-0" />}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-[hsl(0,0%,100%)] flex-shrink-0"
                style={{ backgroundColor: notification.color }}
              >
                {notification.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium mb-0.5 ${!notification.read ? "text-[hsl(210,20%,95%)]" : "text-[hsl(210,20%,80%)]"}`}>
                  {notification.title}
                </p>
                <p className="text-sm text-[hsl(215,15%,50%)] leading-relaxed">{notification.message}</p>
                <p className="text-xs text-[hsl(215,15%,40%)] mt-1">{notification.time}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!notification.read && (
                  <button
                    onClick={() => markNotificationRead(notification.id)}
                    className="px-3 py-1 text-xs text-[hsl(210,80%,56%)] hover:bg-[hsl(210,80%,56%,0.08)] rounded transition-colors"
                  >
                    Mark read
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="p-1.5 hover:bg-[hsl(220,15%,22%)] rounded transition-colors text-[hsl(215,15%,45%)] hover:text-[hsl(0,72%,60%)]"
                  title="Delete notification"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
