const BASE_URL = "https://saavn.sumit.co";

export interface SaavnSong {
  id: string;
  name: string;
  duration: string;
  primaryArtists: string;
  image: { quality: string; link: string }[];
  downloadUrl: { quality: string; link: string }[];
}

export async function searchSongs(query: string): Promise<SaavnSong[]> {
  const res = await fetch(
    `${BASE_URL}/api/search/songs?query=${encodeURIComponent(query)}`
  );
  const json = await res.json();
  return json?.data?.results ?? [];
}

export interface SaavnArtist {
  id: string;
  name: string;
  image: { quality: string; link: string }[];
}

export interface SaavnArtistSong {
  id: string;
  name: string;
  primaryArtists: string;
  image: { quality: string; link: string }[];
  downloadUrl: { quality: string; link?: string; url?: string }[];
}

export async function searchArtists(query: string): Promise<SaavnArtist[]> {
  const res = await fetch(
    `${BASE_URL}/api/search/artists?query=${encodeURIComponent(query)}`
  );
  const json = await res.json();
  return json?.data?.results ?? [];
}

export async function getArtistSongs(
  artistId: string
): Promise<SaavnArtistSong[]> {
  const res = await fetch(`${BASE_URL}/api/artists/${artistId}/songs`);
  const json = await res.json();
  return json?.data?.songs ?? [];
}
