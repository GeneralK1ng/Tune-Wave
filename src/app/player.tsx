import { MovingText } from '@/components/MovingText'
import { PlayerControls } from '@/components/PlayerControls'
import { PlayerProgressBar } from '@/components/PlayerProgressBar'
import { PlayerRepeatToggle } from '@/components/PlayerRepeatToggle'
import { PlayerVolumeBar } from '@/components/PlayerVolumeBar'
import { unKnownTrackImageUri } from '@/constants/images'
import { colors, fontSize, screenPadding } from '@/constants/tokens'
import { usePlayerBackground } from '@/hooks/usePlayerBackground'
import { defaultStyles, utilsStyles } from '@/styles'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, Easing, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'
const PlayerScreen = () => {
	const activeTrack = useActiveTrack()

	const { imageColor } = usePlayerBackground(activeTrack?.artwork ?? unKnownTrackImageUri)

	const { top, bottom } = useSafeAreaInsets()

	const isFavorite = false

	const toggleFavorite = () => {}

	if (!activeTrack) {
		return (
			<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
				<ActivityIndicator color={colors.icon} />
			</View>
		)
	}

	return (
		<LinearGradient
			style={{ flex: 1 }}
			colors={
				imageColor
					? [imageColor.average, imageColor.dominant]
					: [colors.background, colors.background]
			}
		>
			<View style={styles.overlayContainer}>
				<DismissPlayerSymbol />

				<View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
					<View style={styles.artworkImageContainer}>
						<FastImage
							source={{
								uri: activeTrack.artwork ?? unKnownTrackImageUri,
								priority: FastImage.priority.high,
							}}
							resizeMode="cover"
							style={styles.artworkImage}
						/>
					</View>

					<View style={{ flex: 1 }}>
						<View style={{ marginTop: 'auto', marginBottom: 20 }}>
							<View style={{ height: 60 }}>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									{/* Track title */}
									<View style={styles.trackTitleContainer}>
										<MovingText
											text={activeTrack.title ?? ''}
											animationThreshold={30}
											style={styles.trackTitleText}
										/>
									</View>

									{/* Favorite button icon */}
									<FontAwesome
										name={isFavorite ? 'heart' : 'heart-o'}
										size={20}
										color={isFavorite ? colors.primary : colors.icon}
										style={{ marginHorizontal: 14 }}
										onPress={toggleFavorite}
									/>
								</View>

								{/* Track artist */}
								{activeTrack.artist && (
									<Text numberOfLines={1} style={[styles.trackArtistText, { marginTop: 6 }]}>
										{activeTrack.artist}
									</Text>
								)}
							</View>

							<PlayerProgressBar style={{ marginTop: 32 }} />

							<PlayerControls style={{ marginTop: 40 }} />
						</View>

						<PlayerVolumeBar style={{ marginTop: 'auto', marginBottom: 30 }} />

						<View style={[utilsStyles.centeredRow, { marginBottom: 30 }]}>
							<PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
						</View>
					</View>
				</View>
			</View>
		</LinearGradient>
	)
}

const DismissPlayerSymbol = () => {
	const { bottom, left, right } = useSafeAreaInsets()

	const translateX = useRef(new Animated.Value(0)).current

	useEffect(() => {
		// 动画效果：左右跳动
		const bounceAnimation = Animated.loop(
			Animated.sequence([
				Animated.timing(translateX, {
					toValue: 2, // 向右移动
					duration: 150,
					easing: Easing.linear,
					useNativeDriver: true,
				}),
				Animated.timing(translateX, {
					toValue: -2, // 向左移动
					duration: 150,
					easing: Easing.linear,
					useNativeDriver: true,
				}),
				Animated.timing(translateX, {
					toValue: 0, // 回到初始位置
					duration: 150,
					easing: Easing.linear,
					useNativeDriver: true,
				}),
			]),
		)
		bounceAnimation.start()

		// 清除动画
		return () => bounceAnimation.stop()
	}, [translateX])

	return (
		<Animated.View
			style={{
				position: 'absolute',
				bottom: bottom + 80,
				left: left + 8,
				right: 0,
				flexDirection: 'row',
				alignItems: 'flex-start',
				transform: [{ translateX }],
				// justifyContent: 'center',
			}}
		>
			<View
				accessible={false}
				style={{
					width: 8,
					height: 100,
					borderRadius: 8,
					backgroundColor: '#fff',
					opacity: 0.7,
				}}
			/>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	artworkImageContainer: {
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 11.0,
		flexDirection: 'row',
		justifyContent: 'center',
		height: '45%',
	},
	artworkImage: {
		width: '100%',
		height: '100%',
		borderRadius: 12,
		resizeMode: 'cover',
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: 22,
		fontWeight: '700',
	},
	trackArtistText: {
		...defaultStyles.text,
		fontSize: fontSize.base,
		opacity: 0.8,
		maxWidth: '90%',
	},
})

export default PlayerScreen
