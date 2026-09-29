export const getImageUrl = (image) => {
  if (typeof image === 'string') return image.trim()
  if (!image || typeof image !== 'object') return ''
  if (typeof image.src === 'string') return image.src.trim()
  if (typeof image.url === 'string') return image.url.trim()
  if (typeof image.default === 'string') return image.default.trim()
  return ''
}
