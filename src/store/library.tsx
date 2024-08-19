import library from '@/assets/data/library.json'
import { TrackWithPlaylist } from '@/helper/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'

interface libraryState {
	tracks: TrackWithPlaylist[]

	toggleTrackFavorite: (track: Track) => void

	addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<libraryState>()((set) => ({
	tracks: library,
	toggleTrackFavorite: () => {},
	addToPlaylist: () => {},
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavorites = () => {
	const favorites = useLibraryStore((state) => state.tracks.filter((track) => track.rating === 1))
	const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)

	return {
		favorites,
		toggleTrackFavorite,
	}
}
