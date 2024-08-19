import { colors } from '@/constants/tokens'
import { useEffect, useState } from 'react'
import { getColors } from 'react-native-image-colors'
import { AndroidImageColors } from 'react-native-image-colors/build/types'

/**
 * 使用给定的图像URL设置玩家背景
 * 该函数通过分析图像的颜色来确定一个主导颜色，该颜色可用于UI的主题或其他视觉效果
 *
 * @param imageUrl 图像的URL地址
 * @returns 返回一个对象，该对象包含图像的主导颜色
 */
export const usePlayerBackground = (imageUrl: string) => {
	// 使用React的state来存储图像的主导颜色
	const [imageColor, setImageColor] = useState<AndroidImageColors | null>(null)

	// 当imageUrl变化时，使用useEffect来分析图像颜色
	useEffect(() => {
		// 调用getColors函数分析图像颜色，提供fallback颜色、启用缓存和缓存键
		getColors(imageUrl, {
			fallback: colors.background,
			cache: true,
			key: imageUrl,
		}).then((colors) => setImageColor(colors as AndroidImageColors))
	}, [imageUrl])

	// 返回图像颜色状态，供组件其他部分使用
	return { imageColor }
}
