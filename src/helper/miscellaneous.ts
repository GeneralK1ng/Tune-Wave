/**
 * 将秒数转换为分钟和秒数的格式化字符串
 *
 * 该函数接受一个秒数作为输入，将其转换为分钟和秒数的格式化字符串
 * 转换过程中，首先通过除以60并向下取整得到总分钟数，
 * 然后通过取余操作得到剩余的秒数
 * 最后将分钟数和秒数格式化为两位数，并用冒号连接起来返回
 *
 * @param seconds 输入的总秒数
 * @returns 格式化后的分钟和秒数字符串，格式为 "MM:SS"
 */
export const formatSecondsToMinutes = (seconds: number) => {
	// 计算总分钟数，通过将秒数除以60并向下取整得到
	const minutes = Math.floor(seconds / 60)

	// 计算剩余的秒数，通过秒数对60取余得到
	const remainingSeconds = Math.floor(seconds % 60)

	// 将分钟数格式化为两位数字符串，如果小于10则前面补0
	const formattedMinutes = String(minutes).padStart(2, '0')
	// 将剩余的秒数格式化为两位数字符串，如果小于10则前面补0
	const formattedSeconds = String(remainingSeconds).padStart(2, '0')

	// 返回格式化后的分钟和秒数字符串
	return `${formattedMinutes}:${formattedSeconds}`
}

export const generateTracksListId = (trackListName: string, search?: string) => {
	return `${trackListName}${`-${search}` || ''}`
}
