import { colors } from '@/constants/tokens'
import { SearchBar } from '@rneui/themed'
import React from 'react'

interface SearchBarComponentProps {
	search: string
	onSearchChange: (search: string) => void
}

const SearchBarComponent: React.FC<SearchBarComponentProps> = ({ search, onSearchChange }) => {
	return (
		<SearchBar
			placeholder="Search for Songs..."
			onChangeText={onSearchChange}
			value={search}
			containerStyle={{ backgroundColor: colors.background, marginTop: 120 }}
			round={true}
		/>
	)
}

export default SearchBarComponent
