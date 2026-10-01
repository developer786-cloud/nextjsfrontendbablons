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
      if (initialData?.blogs?.length && !params.category) {
        setError('')
      } else {
        setError(err.response?.data?.message || 'Unable to load blogs right now.')
        setBlogs([])
        setCategories([])
      }
    } finally {
      setLoadedParamsKey(paramsKey)
    }
  }, [applyBlogData, initialData, params.category, paramsKey, requestBlogs])

  useEffect(() => {
    let mounted = true
    requestBlogs()
      .then((data) => {
        if (mounted) applyBlogData(data)
      })
      .catch((err) => {
        if (!mounted) return
        if (initialData?.blogs?.length && !params.category) {
          setError('')
        } else {
          setError(err.response?.data?.message || 'Unable to load blogs right now.')
          setBlogs([])
          setCategories([])
        }
      })
      .finally(() => {
        if (mounted) setLoadedParamsKey(paramsKey)
      })

    return () => {
      mounted = false
    }
  }, [applyBlogData, initialData, params.category, paramsKey, requestBlogs])

  return {
    blogs,
    categories,
    meta,
    loading,
    error,
    reload: loadBlogs,
  }
}

export const useBlog = (slug, initialBlog = null) => {
  const [blog, setBlog] = useState(initialBlog)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(!initialBlog)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadBlog = async () => {
      if (!slug) return
      if (initialBlog) setBlog(initialBlog)
      else setLoading(true)
      setError('')
      try {
        const data = await blogService.getBlogBySlug(slug)
        if (!isMounted) return
        setBlog(data.blog || data.item || null)
        setRelatedBlogs(data.relatedBlogs || [])
      } catch (err) {
        if (!isMounted) return
        if (!initialBlog) {
          setError(err.response?.data?.message || 'Blog not found.')
          setBlog(null)
          setRelatedBlogs([])
        }
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
