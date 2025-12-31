import { Audio } from "expo-av";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Song {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  url: string;
}

interface PlayerState {
  sound: Audio.Sound | null;
  currentSong: Song | null;
  isPlaying: boolean;
  position: number;
  duration: number;

  queue: Song[];
  isShuffle: boolean;
  isRepeat: boolean;

  hydrateQueue: () => Promise<void>;
  playSong: (song: Song) => Promise<void>;
  togglePlay: () => Promise<void>;
  addToQueue: (song: Song) => Promise<void>;
  playNext: () => Promise<void>;

  removeFromQueue: (id: string) => Promise<void>;
  moveQueueItem: (from: number, to: number) => Promise<void>;

  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

const QUEUE_KEY = "PLAYER_QUEUE";

export const usePlayerStore = create<PlayerState>((set, get) => ({
  sound: null,
  currentSong: null,
  isPlaying: false,
  position: 0,
  duration: 0,

  queue: [],
  isShuffle: false,
  isRepeat: false,

  hydrateQueue: async () => {
    const saved = await AsyncStorage.getItem(QUEUE_KEY);
    if (saved) {
      set({ queue: JSON.parse(saved) });
    }
  },

  addToQueue: async (song) => {
    const updated = [...get().queue, song];
    set({ queue: updated });
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(updated));
  },

  removeFromQueue: async (id) => {
    const updated = get().queue.filter((s) => s.id !== id);
    set({ queue: updated });
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(updated));
  },

  moveQueueItem: async (from, to) => {
    const queue = [...get().queue];
    if (to < 0 || to >= queue.length) return;

    const item = queue.splice(from, 1)[0];
    queue.splice(to, 0, item);

    set({ queue });
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  },

  playSong: async (song) => {
    const { sound } = get();

    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }

    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: song.url },
      { shouldPlay: false }
    );

    newSound.setOnPlaybackStatusUpdate(async (status) => {
      if (!status.isLoaded) return;

      set({
        position: status.positionMillis ?? 0,
        duration: status.durationMillis ?? 0,
        isPlaying: status.isPlaying ?? false,
      });

      if (status.didJustFinish) {
        if (get().isRepeat && get().currentSong) {
          await get().playSong(get().currentSong!);
        } else {
          await get().playNext();
        }
      }
    });

    await newSound.playAsync();

    set({
      sound: newSound,
      currentSong: song,
      isPlaying: true,
    });
  },

  togglePlay: async () => {
    const { sound, isPlaying } = get();
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
      set({ isPlaying: false });
    } else {
      await sound.playAsync();
      set({ isPlaying: true });
    }
  },

  playNext: async () => {
    const { queue, isShuffle } = get();
    if (queue.length === 0) return;

    let nextSong: Song;
    let restQueue: Song[];

    if (isShuffle) {
      const index = Math.floor(Math.random() * queue.length);
      nextSong = queue[index];
      restQueue = queue.filter((_, i) => i !== index);
    } else {
      nextSong = queue[0];
      restQueue = queue.slice(1);
    }

    set({ queue: restQueue });
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(restQueue));

    await get().playSong(nextSong);
  },

  toggleShuffle: () => set((s) => ({ isShuffle: !s.isShuffle })),

  toggleRepeat: () => set((s) => ({ isRepeat: !s.isRepeat })),
}));
