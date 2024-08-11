import library from '@/assets/data/library.json'
import SearchBarComponent from '@/components/SearchBarComponent'
import { TracksList } from '@/components/TracksList'
import { trackTitleFilter } from '@/helper/filter'
import useSearch from '@/hooks/useSearchSongs'
import { defaultStyles } from '@/styles'
import React, { useMemo } from 'react'
import { ScrollView, View } from 'react-native'

const SongsScreen = () => {
	const { search, updateSearch } = useSearch()

	const filterTracks = useMemo(() => {
		if (!search) return library

		return library.filter(trackTitleFilter(search))
	}, [search])

	return (
		<View style={defaultStyles.container}>
			<SearchBarComponent search={search} onSearchChange={updateSearch} />

			<ScrollView contentInsetAdjustmentBehavior="automatic">
				<TracksList tracks={filterTracks} scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}

export default SongsScreen
