# 🎵 Music Player App (React Native)

A music streaming application built using **React Native (Expo)** and the **JioSaavn public API**.  
This project focuses on **clean architecture, global state management, and UI polish**, as required in the assignment.

---

## ✨ Features

### Core Features

- Browse and play **real songs** from JioSaavn
- Full-screen **Player** with play/pause and seek bar
- **Persistent Mini Player** synced across all screens
- **Queue management**
  - Add songs to queue
  - Auto-play next song
  - Persist queue locally
- **Artist listing** and artist detail screen

### Bonus Features

- 🔀 **Shuffle mode**
- 🔁 **Repeat mode**
- 🌙 Dark-themed UI inspired by the provided Figma design

---

## 🧠 Architecture & Design Decisions

### Tech Stack

- **React Native (Expo) + TypeScript**
- **React Navigation v6** (Stack + Bottom Tabs)
- **Zustand** for global state management
- **Expo AV** for audio playback
- **AsyncStorage** for local persistence

### Architecture Overview

- A **single global audio instance** is managed using Zustand
- Mini Player and Full Player consume the **same global state**, ensuring perfect synchronization
- Clear separation of concerns:
  - API layer
  - State layer
  - UI layer
- No mock data is used — all content is fetched from live API responses

This architecture makes the app **easy to extend** (albums, playlists, downloads, etc.).

---

## 🌐 API Usage

**Base URL**
https://saavn.sumit.co/

### Endpoints Used

- `GET /api/search/songs` → Fetch songs for Home screen
- `GET /api/search/artists` → Fetch artists list
- `GET /api/artists/{id}/songs` → Fetch songs by artist

Only the required endpoints were used to keep the implementation **simple and focused**, while still using real data.

---

## 🎧 Audio Playback

- Audio playback handled using **Expo AV**
- Playback state (play/pause, position, duration) managed globally
- **Auto-play next song** when the current song finishes
- Background playback supported in **standalone builds**

> ⚠️ Note: Due to iOS limitations in **Expo Go**, background playback cannot be demonstrated there.  
> This works correctly in **Android APK builds** and custom dev builds.

---

## 📱 Screens Implemented

| Screen      | Description                              |
| ----------- | ---------------------------------------- |
| Home        | Song list with real data                 |
| Player      | Full player with seek bar and controls   |
| Mini Player | Persistent bottom bar synced with player |
| Queue       | View and play queued songs               |
| Artists     | Artist list and artist detail screen     |

---

## 🛠️ Setup & Run Locally

```bash
npm install
npx expo start
```
