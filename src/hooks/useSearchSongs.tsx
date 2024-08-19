import { useState } from 'react'

/**
 * 使用useSearch钩子来管理搜索状态
 *
 * 此钩子提供了一种状态管理机制，用于处理搜索输入的变化
 * 它返回一个对象，其中包含当前的搜索字符串和一个用于更新搜索字符串的方法
 *
 * @returns {object} 包含search字符串和updateSearch方法的对象
 */
const useSearch = () => {
	// 使用useState钩子来声明一个状态变量search和一个函数setSearch来更新这个变量
	const [search, setSearch] = useState('')

	/**
	 * 更新搜索字符串的函数
	 *
	 * @param {string} newSearch - 新的搜索字符串
	 */
	const updateSearch = (newSearch: string) => {
		setSearch(newSearch)
	}

	// 返回一个对象，其中包含当前的搜索字符串和用于更新搜索字符串的方法
	return {
		search,
		updateSearch,
	}
}

export default useSearch
