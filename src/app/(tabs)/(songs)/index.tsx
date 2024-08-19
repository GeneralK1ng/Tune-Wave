import SearchBarComponent from '@/components/SearchBarComponent'
import { TracksList } from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helper/filter'
import { generateTracksListId } from '@/helper/miscellaneous'
import useSearch from '@/hooks/useSearchSongs'
import { useTracks } from '@/store/library'
import { defaultStyles } from '@/styles'
import React, { useMemo } from 'react'
import { ScrollView, View } from 'react-native'

const SongsScreen = () => {
	const { search, updateSearch } = useSearch()

	const tracks = useTracks()

	const filterTracks = useMemo(() => {
		if (!search) return tracks

		return tracks.filter(trackTitleFilter(search))
	}, [search, tracks])

	return (
		<View style={defaultStyles.container}>
			<SearchBarComponent search={search} onSearchChange={updateSearch} />

			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<TracksList
					id={generateTracksListId('songs', search)}
					tracks={filterTracks}
					scrollEnabled={false}
				/>
			</ScrollView>
		</View>
	)
}

export default SongsScreen
