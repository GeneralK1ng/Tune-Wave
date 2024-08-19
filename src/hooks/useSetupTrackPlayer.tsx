import { useEffect, useRef } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

/**
 * 异步设置播放器环境
 *
 * 此函数主要用于初始化播放器设置，包括缓存大小、音量和重复模式设置
 */
const setupPlayer = async () => {
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10, // 设置最大缓存大小为10MB
	})

	await TrackPlayer.setVolume(0.5) // 设置音量为0.5，避免过大
	await TrackPlayer.setRepeatMode(RepeatMode.Queue) // 设置播放器重复模式为Queue
}

// 定义一个自定义钩子useSetupTrackPlayer，用于设置和初始化音频播放器
// 参数{ onLoad }：一个包含onLoad回调函数的对象，当播放器初始化完成后调用此函数
export const useSetupTrackPlayer = ({ onLoad }: { onLoad: () => void }) => {
	// 创建一个引用，用于跟踪播放器是否已经初始化
	const isInitialized = useRef(false)

	// 使用useEffect钩子，在组件挂载或onLoad变化时设置播放器
	useEffect(() => {
		// 调用setupPlayer函数设置播放器
		setupPlayer()
			.then(() => {
				// 设置播放器初始化状态为true，并调用onLoad回调函数（如果提供）
				isInitialized.current = true
				onLoad?.()
			})
			.catch((error) => {
				// 如果设置播放器失败，将初始化状态设置为false，并打印错误信息
				isInitialized.current = false
				console.error(error)
			})
	}, [onLoad])
}
