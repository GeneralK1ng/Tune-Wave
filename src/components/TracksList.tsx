import { unKnownTrackImageUri } from '@/constants/images'
import { useQueue } from '@/store/queue'
import { utilsStyles } from '@/styles'
import { useRef } from 'react'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import TrackPlayer, { Track } from 'react-native-track-player'
import { TracksListItem } from './TracksListItem'

export type TracksListProps = Partial<FlatListProps<Track>> & {
	id: string
	tracks: Track[]
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TracksList = ({ id, tracks, ...flatListProps }: TracksListProps) => {
	const queueOffset = useRef(0)

	const { activeQueueId, setActiveQueueId } = useQueue()

	const handleTrackPress = async (selectedTrack: Track) => {
		const trackIdx = tracks.findIndex((track) => track.url === selectedTrack.url)

		if (trackIdx === -1) return

		const isChangingQueue = id !== activeQueueId

		if (isChangingQueue) {
			const beforeTracks = tracks.slice(0, trackIdx)
			const afterTracks = tracks.slice(trackIdx + 1)

			await TrackPlayer.reset()

			await TrackPlayer.add(selectedTrack)
			await TrackPlayer.add(afterTracks)
			await TrackPlayer.add(beforeTracks)

			await TrackPlayer.play()

			queueOffset.current = trackIdx
			setActiveQueueId(id)
		} else {
			const nextTrackIdx =
				trackIdx - queueOffset.current < 0
					? tracks.length + trackIdx - queueOffset.current
					: trackIdx - queueOffset.current

			await TrackPlayer.skip(nextTrackIdx)
			await TrackPlayer.play()
		}

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
