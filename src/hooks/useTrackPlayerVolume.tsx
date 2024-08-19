import { useCallback, useEffect, useState } from 'react'
import TrackPlayer from 'react-native-track-player'

// 定义一个钩子函数，用于跟踪和设置播放器音量
export const useTrackPlayerVolume = () => {
	// 初始化音量状态，初始值未定义
	const [volume, setVolume] = useState<number | undefined>(undefined)

	// 获取当前播放器音量
	const getVolume = useCallback(async () => {
		// 从TrackPlayer获取当前音量
		const currentVolume = await TrackPlayer.getVolume()
		// 更新音量状态
		setVolume(currentVolume)
	}, [])

	// 更新播放器音量
	const updateVolume = useCallback(async (newVolume: number) => {
		// 检查音量值是否在0到1的范围内
		if (newVolume < 0 || newVolume > 1) return
		// 更新音量状态
		setVolume(newVolume)
		// 设置TrackPlayer的音量
		await TrackPlayer.setVolume(newVolume)
	}, [])

	// 组件挂载时获取当前音量
	useEffect(() => {
		getVolume()
	}, [])

	// 返回当前音量和更新音量的函数
	return { volume, updateVolume }
}
