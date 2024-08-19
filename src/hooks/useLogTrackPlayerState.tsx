import { Event, useTrackPlayerEvents } from 'react-native-track-player'

const events = [Event.PlaybackState, Event.PlaybackError, Event.PlaybackActiveTrackChanged]

/**
 * 使用日志记录器来监控播放器状态的变化
 *
 * 此函数通过监听播放器的一系列事件来实现监控功能，包括播放错误、播放状态改变和当前播放曲目改变
 * 当相应的事件发生时，会在控制台输出相应的日志信息
 */
export const useLogTrackPlayerState = () => {
	// 监听播放器事件
	useTrackPlayerEvents(events, async (event) => {
		// 当发生播放错误时，输出错误信息
		if (event.type === Event.PlaybackError) {
			console.log('An error occurred while playing the track:', event)
		}

		// 当播放状态发生变化时，输出新的播放状态
		if (event.type === Event.PlaybackState) {
			console.log('The playback state changed:', event)
		}

		// 当当前播放曲目发生变化时，输出新的曲目信息
		if (event.type === Event.PlaybackActiveTrackChanged) {
			console.log('The active track changed:', event)
		}
	})
}
