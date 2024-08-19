import SearchBarComponent from '@/components/SearchBarComponent'
import { TracksList } from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helper/filter'
import { generateTracksListId } from '@/helper/miscellaneous'
import useSearch from '@/hooks/useSearchSongs'
import { useFavorites } from '@/store/library'
import { defaultStyles } from '@/styles'
import { useMemo } from 'react'
import { ScrollView, View } from 'react-native'

const FavoritesScreen = () => {
	const { search, updateSearch } = useSearch()

	const favoritesTracks = useFavorites().favorites

	const filteredFavoritesTracks = useMemo(() => {
		if (!search) return favoritesTracks

		return favoritesTracks.filter(trackTitleFilter(search))
	}, [search, favoritesTracks])

	return (
		<View style={defaultStyles.container}>
			<SearchBarComponent search={search} onSearchChange={updateSearch} />

			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<TracksList
					id={generateTracksListId('favorites', search)}
					scrollEnabled={false}
					tracks={filteredFavoritesTracks}
				/>
			</ScrollView>
		</View>
	)
}

export default FavoritesScreen
