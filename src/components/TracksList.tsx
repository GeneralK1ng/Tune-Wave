import { utilsStyles } from '@/styles'
import { FlatList, FlatListProps, View } from 'react-native'
import { TracksListItem } from './TracksListItem'

export type TracksListProps = Partial<FlatListProps<unknown>> & {
	tracks: any[]
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TracksList = ({ tracks, ...flatListProps }: TracksListProps) => {
	return (
		<FlatList
			data={tracks}
			style={{ marginTop: 0, marginBottom: 60 }}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListFooterComponent={ItemDivider}
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item: track }) => (
				<TracksListItem
					track={{
						...track,
						image: track.artwork,
					}}
				/>
			)}
			{...flatListProps}
		/>
	)
}
