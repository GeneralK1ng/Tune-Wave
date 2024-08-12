import { PlayPauseButton, SkipToNextButton } from '@/components/PlayerControls'
import { unKnownTrackImageUri } from '@/constants/images'
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack'
import { defaultStyles } from '@/styles'
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useActiveTrack } from 'react-native-track-player'
import { MovingText } from './MovingText'

export const FloatingPlayer = ({ style }: ViewProps) => {
	const activeTrack = useActiveTrack()

	const lastActiveTrack = useLastActiveTrack()

	const displayedTrack = activeTrack ?? lastActiveTrack

	if (!displayedTrack) return null

	return (
		<TouchableOpacity activeOpacity={0.9} style={[styles.container, style]}>
			<>
				<FastImage
					source={{
						uri: displayedTrack.artwork ?? unKnownTrackImageUri,
					}}
					style={styles.trackArtworkImage}
				/>

				<View style={styles.trackTitleContainer}>
					<MovingText
						style={styles.trackTitle}
						text={displayedTrack.title ?? ''}
						animationThreshold={25}
					/>
				</View>

				<View style={styles.trackControlsContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={24} />
				</View>
			</>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	trackArtworkImage: {
		borderRadius: 8,
		height: 50,
		width: 50,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackControlsContainer: {
		flexDirection: 'row',
		columnGap: 20,
		alignItems: 'center',
		marginRight: 16,
		paddingRight: 16,
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#252525',
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
	},
})
