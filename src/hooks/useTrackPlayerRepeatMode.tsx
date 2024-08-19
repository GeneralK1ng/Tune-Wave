import { useCallback, useEffect, useState } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

// 定义一个钩子函数，用于管理音频播放器的重复模式
export const useTrackPlayerRepeatMode = () => {
	// 状态变量，用于存储当前的重复模式
	const [repeatMode, setRepeatMode] = useState<RepeatMode>()

	// 创建一个函数，用于更改音频播放器的重复模式
	const changeRepeatMode = useCallback(async (repeatMode: RepeatMode) => {
		// 调用TrackPlayer的setRepeatMode方法设置新的重复模式
		await TrackPlayer.setRepeatMode(repeatMode)
		// 更新状态变量，反映新的重复模式
		setRepeatMode(repeatMode)
	}, [])

	// 在组件挂载时获取当前的重复模式
	useEffect(() => {
		// 调用TrackPlayer的getRepeatMode方法获取当前重复模式，并更新状态变量
		TrackPlayer.getRepeatMode().then(setRepeatMode)
	}, [])

	// 返回当前的重复模式和更改重复模式的函数
	return { repeatMode, changeRepeatMode }
}
