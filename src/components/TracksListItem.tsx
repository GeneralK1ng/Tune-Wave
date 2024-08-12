import { unKnownTrackImageUri } from '@/constants/images'
import { colors, fontSize } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import LoaderKit from 'react-native-loader-kit'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'

export type TracksListItemProps = {
	track: Track
	onTrackPress: (track: Track) => void
}

export const TracksListItem = ({ track, onTrackPress: handleTrackPress }: TracksListItemProps) => {
	const { playing } = useIsPlaying()

	const isActiveTrack = useActiveTrack()?.url === track.url

	return (
		<TouchableHighlight onPress={() => handleTrackPress(track)}>
			<View style={styles.trackItemContainer}>
				<View>
					<FastImage
						source={{
							uri: track.artwork ?? unKnownTrackImageUri,
							priority: FastImage.priority.normal,
						}}
						style={{
							...styles.trackArtworkImage,
							opacity: isActiveTrack ? 0.6 : 1,
						}}
					/>

					{isActiveTrack &&
						(playing ? (
							<LoaderKit
								style={styles.trackPlayingIconIndicator}
								name="LineScaleParty"
								color={colors.icon}
							/>
						) : (
							<Ionicons
								style={styles.trackPausedIndicator}
								name="play"
								size={30}
								color={colors.icon}
							/>
						))}
				</View>

				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
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

					<Entypo name="dots-three-horizontal" size={24} color={colors.icon} />
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	trackArtworkImage: {
		borderRadius: 8,
		height: 60,
		width: 60,
	},
	trackPlayingIconIndicator: {
		position: 'absolute',
		top: 18,
		left: 18,
		right: 18,
		height: 24,
	},
	trackPausedIndicator: {
		position: 'absolute',
		top: 15,
		left: 15,
		right: 15,
		height: 30,
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
