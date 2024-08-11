import { StackScreenAndTitle } from '@/constants/layout'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View } from 'react-native'
const PlaylistScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						...StackScreenAndTitle,
						headerTitle: 'Playlist',
					}}
				/>
			</Stack>
		</View>
	)
}

export default PlaylistScreenLayout
