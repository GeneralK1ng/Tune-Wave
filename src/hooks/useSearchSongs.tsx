import { useState } from 'react'

const useSearch = () => {
	const [search, setSearch] = useState('')

	const updateSearch = (newSearch: string) => {
		setSearch(newSearch)
	}

	return {
		search,
		updateSearch,
	}
}

export default useSearch
