import { useEffect, useState } from 'react'
import { Track, useActiveTrack } from 'react-native-track-player'

// 导出一个钩子函数，用于获取上一个活跃的音轨
export const useLastActiveTrack = () => {
	// 使用自定义钩子useActiveTrack获取当前活跃的音轨
	const activeTrack = useActiveTrack()

	// 定义一个状态变量lastActiveTrack和它的设置函数setLastActiveTrack
	// 用于存储上一个活跃的音轨
	const [lastActiveTrack, setLastActiveTrack] = useState<Track>()

	// 使用React的useEffect钩子来监听activeTrack的变化
	useEffect(() => {
		// 如果当前没有活跃的音轨，则直接返回，不执行任何操作
		if (!activeTrack) return

		// 当活跃的音轨变化时，将其设置为新的上一个活跃音轨
		setLastActiveTrack(activeTrack)
	}, [activeTrack])

	// 返回上一个活跃的音轨
	return lastActiveTrack
}
