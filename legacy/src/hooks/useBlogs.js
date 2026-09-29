import { useCallback, useEffect, useMemo, useState } from 'react'
import { blogService } from '../services/blogService'

export const useBlogs = (params = {}, initialData = null) => {
  const paramsKey = JSON.stringify(params)
  const requestParams = useMemo(() => JSON.parse(paramsKey), [paramsKey])
  const [blogs, setBlogs] = useState(initialData?.blogs || [])
  const [categories, setCategories] = useState(initialData?.categories || [...new Set((initialData?.blogs || []).map((blog) => blog.category).filter(Boolean))])
  const [meta, setMeta] = useState(initialData?.meta || { page: 1, total: initialData?.blogs?.length || 0, totalPages: 1 })
  const [loadedParamsKey, setLoadedParamsKey] = useState(initialData ? paramsKey : '')
  const loading = loadedParamsKey !== paramsKey
  const [error, setError] = useState('')

  const requestBlogs = useCallback(() => blogService.getBlogs(requestParams), [requestParams])
  const applyBlogData = useCallback((data) => {
    setError('')
    setBlogs(data.blogs || data.items || [])
    setCategories(data.categories || [])
    setMeta({
      page: data.page || 1,
      total: data.total || 0,
      totalPages: data.totalPages || 1,
    })
  }, [])

  const loadBlogs = useCallback(async () => {
    try {
      const data = await requestBlogs()
      applyBlogData(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load blogs right now.')
      setBlogs([])
      setCategories([])
    } finally {
      setLoadedParamsKey(paramsKey)
    }
  }, [applyBlogData, paramsKey, requestBlogs])

  useEffect(() => {
    if (initialData && !params.category) return
    let mounted = true
    requestBlogs()
      .then((data) => {
        if (mounted) applyBlogData(data)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.response?.data?.message || 'Unable to load blogs right now.')
        setBlogs([])
        setCategories([])
      })
      .finally(() => {
        if (mounted) setLoadedParamsKey(paramsKey)
      })

    return () => {
      mounted = false
    }
  }, [applyBlogData, initialData, params.category, paramsKey, requestBlogs])

  const useInitialData = Boolean(initialData && !params.category)
  return {
    blogs: useInitialData ? initialData.blogs || [] : blogs,
    categories: useInitialData
      ? initialData.categories || [...new Set((initialData.blogs || []).map((blog) => blog.category).filter(Boolean))]
      : categories,
    meta: useInitialData
      ? initialData.meta || { page: 1, total: initialData.blogs?.length || 0, totalPages: 1 }
      : meta,
    loading: useInitialData ? false : loading,
    error,
    reload: loadBlogs,
  }
}

export const useBlog = (slug, initialBlog = null) => {
  const [blog, setBlog] = useState(initialBlog)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialBlog) return undefined
    let isMounted = true

    const loadBlog = async () => {
      if (!slug) return
      setLoading(true)
      setError('')
      try {
        const data = await blogService.getBlogBySlug(slug)
        if (!isMounted) return
        setBlog(data.blog || data.item || null)
        setRelatedBlogs(data.relatedBlogs || [])
      } catch (err) {
        if (!isMounted) return
        setError(err.response?.data?.message || 'Blog not found.')
        setBlog(null)
        setRelatedBlogs([])
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadBlog()

    return () => {
      isMounted = false
    }
  }, [slug, initialBlog])

  return { blog, relatedBlogs, loading, error }
}
