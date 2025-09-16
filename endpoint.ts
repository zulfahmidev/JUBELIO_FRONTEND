const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
export const endpoints = {
    post: {
        list: (
            limit: number = 10, 
            page: number = 1,
            search: string = '',
            category: string = ''
        ) => {
            console.log(`${BASE_URL}/post?limit=${limit}&page=${page}&search=${search}&category=${category}`)
            return `${BASE_URL}/post?limit=${limit}&page=${page}&search=${search}&category=${category}`
        },
        show: (
            slug: string = ''
        ) => `${BASE_URL}/post/${slug}`,
    },
    category: {
        list: (
            limit: number = 10, 
            page: number = 1
        ) => `${BASE_URL}/category?limit=${limit}&page=${page}`,
    }
}
