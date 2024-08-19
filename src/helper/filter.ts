/**
 * 创建一个用于过滤曲目的函数
 * 该函数用于判断曲目的标题是否包含指定的字符串
 *
 * @param title 曲目标题的搜索字符串
 * @returns 返回一个函数，该函数接受一个曲目对象作为参数，
 *          并返回一个布尔值，指示曲目标题是否包含指定的字符串
 */
export const trackTitleFilter = (title: string) => (track: any) => {
	// 检查曲目标题是否包含指定的字符串，不区分大小写
	return track.title?.toLowerCase().includes(title.toLowerCase())
}
