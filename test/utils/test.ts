export const createString = (len: number): string => [...Array(len)].map(i => (~~(Math.random() * 36)).toString(36)).join('')
