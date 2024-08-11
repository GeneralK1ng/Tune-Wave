import { StackScreenAndTitle } from '@/constants/layout'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View } from 'react-native'
const FavoriteScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						...StackScreenAndTitle,
						headerTitle: 'Favorite',
					}}
				/>
			</Stack>
		</View>
	)
}

export default FavoriteScreenLayout
