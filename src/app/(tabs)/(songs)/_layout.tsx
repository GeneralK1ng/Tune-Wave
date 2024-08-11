import { colors } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { Platform, View } from 'react-native'

const SongsScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						// 设置导航栏的背景颜色和 Android 的阴影效果
						headerStyle: Platform.select({
							android: {
								backgroundColor: colors.background,
								elevation: 0.8, // Android 阴影控制
							},
							default: {
								backgroundColor: colors.background,
							},
						}),
						// 设置返回按钮和其他图标的颜色
						headerTintColor: colors.text,
						// 隐藏导航栏下方的阴影
						headerShadowVisible: false,
						headerTitleStyle: {
							fontSize: 48, // 设置标题字号
							color: colors.text, // 设置标题文本颜色
							fontWeight: 'bold', // 设置标题字体粗细
						},
						headerTitleAlign: 'left',
						headerTransparent: true,
						headerTitle: 'Songs',
					}}
				/>
			</Stack>
		</View>
	)
}

export default SongsScreenLayout
