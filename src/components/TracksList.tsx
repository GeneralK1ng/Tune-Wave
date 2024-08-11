import { unKnownTrackImageUri } from '@/constants/images'
import { utilsStyles } from '@/styles'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import TrackPlayer, { Track } from 'react-native-track-player'
import { TracksListItem } from './TracksListItem'

export type TracksListProps = Partial<FlatListProps<Track>> & {
	tracks: Track[]
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TracksList = ({ tracks, ...flatListProps }: TracksListProps) => {
	const handleTrackPress = async (track: Track) => {
		await TrackPlayer.load(track)
		await TrackPlayer.play()
		// console.log('track title', track.title)
	}

	return (
		<FlatList
			data={tracks}
			style={{ marginTop: 0, marginBottom: 60 }}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListFooterComponent={ItemDivider}
			ItemSeparatorComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No Songs Found</Text>

					<FastImage
						source={{
							uri: unKnownTrackImageUri,
							priority: FastImage.priority.normal,
						}}
						style={utilsStyles.emptyContentImage}
					/>
				</View>
			}
			renderItem={({ item: track }) => (
				<TracksListItem track={track} onTrackPress={handleTrackPress} />
			)}
			{...flatListProps}
		/>
	)
}
