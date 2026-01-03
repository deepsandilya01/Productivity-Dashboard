# 🚀 Productivity Dashboard
### Personal Productivity Platform

A modern, responsive, and theme-based **Productivity Dashboard** that helps users manage tasks, plan their day, stay motivated, and focus better — all from a single interface.

🔗 **Live Application**  
👉 https://deepsandilya01.github.io/Productivity-Dashboard/

---

## 📌 Product Vision

The **Productivity Dashboard** is designed as a **front-end SaaS-style application** that combines multiple productivity tools into one seamless experience.

This project focuses on:
- Clean UI/UX
- Scalable theming system
- Persistent user state
- Real-world dashboard behavior

Built entirely using **Vanilla JavaScript**, this project demonstrates strong fundamentals without relying on frameworks.

---

## ✨ Features Overview

### 🕒 Smart Header (Live Data)
- Real-time **date & time**
- City-based **weather fetching**
- Dynamic background images based on:
  - 🌅 Morning
  - ☀️ Afternoon
  - 🌆 Evening
  - 🌙 Night

---

### ✅ To-Do Management
- Add tasks with descriptions
- Mark tasks as **important**
- Remove completed tasks
- Persistent storage using **LocalStorage**

---

### 📅 Daily Planner
- Hour-wise daily planning (6 AM – 12 AM)
- Auto-save on every input
- Ideal for structured daily routines

---

### 💡 Motivation Engine
- Fetches **random motivational quotes**
- Displays quote + author dynamically
- Lightweight and fast API integration

---

### ⏱ Pomodoro Timer
- 25-minute focused work sessions
- 5-minute break cycle
- Start / Pause / Reset controls
- Session indicator (Work / Break)

---

### 🎯 Daily Goals
- Add daily personal goals
- Mark goals as completed
- Goals persist across sessions

---

## 🎨 Design System

### Theme Engine
- 3 curated UI themes:
  - 🌞 Warm Classic
  - 🤍 Soft Cream
  - 🌿 Green Nature
- Theme preference saved in **LocalStorage**
- Border animations adapt automatically to theme colors

### Animated UI
- Smooth animated borders using `conic-gradient`
- Glow effects for:
  - Cards
  - Navbar
  - Header
  - Footer
- Performance-optimized CSS animations

---

## 🛠 Technology Stack

| Layer        | Technology                                                  |
|-------------|--------------------------------------------------------------|
| Structure   | HTML5                                                        |
| Styling     | CSS3 (Custom Properties, Animations, Media Queries)          |
| Logic       | Vanilla JavaScript                                           |
| Storage     | LocalStorage                                                 |
| APIs        | Weather API, DummyJSON Quotes API                            |
| Deployment  | GitHub Pages                                                 |

---

## 📁 Project Structure

```text
Productivity-Dashboard/
├── index.html      # Application structure
├── style.css       # UI, themes & animations
├── script.js       # Core logic & API handling
├── README.md       # Documentation
└── assets/         # Images & static files
