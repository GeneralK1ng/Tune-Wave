import { unKnownTrackImageUri } from '@/constants/images'
import { colors, fontSize } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import FastImage from 'react-native-fast-image'

export type TracksListItemProps = {
	track: {
		title: string
		image?: string
		artist?: string
	}
}

export const TracksListItem = ({ track }: TracksListItemProps) => {
	const isActiveTrack = false
	return (
		<TouchableHighlight>
			<View style={styles.trackItemContainer}>
				<View>
					<FastImage
						source={{
							uri: track.image ?? unKnownTrackImageUri,
							priority: FastImage.priority.normal,
						}}
						style={{
							...styles.trackArtworkImage,
							opacity: isActiveTrack ? 0.6 : 1,
						}}
					/>
				</View>
				{/* Track title and  artist */}
				<View style={{ width: 'auto' }}>
					<Text
						numberOfLines={1}
						style={{
							...styles.trackTitleText,
							color: isActiveTrack ? colors.primary : colors.text,
						}}
					>
						{track.title}
					</Text>

					{track.artist && (
						<Text numberOfLines={1} style={styles.trackArtistText}>
							{track.artist}
						</Text>
					)}
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	trackArtworkImage: {
		borderRadius: 8,
		height: 50,
		width: 50,
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: fontSize.small,
		fontWeight: '600',
		maxWidth: '100%',
		marginBottom: 4,
	},
	trackArtistText: {
		...defaultStyles.text,
		marginTop: 4,
		fontSize: 14,
		color: colors.textMuted,
	},
	trackItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
	},
})
