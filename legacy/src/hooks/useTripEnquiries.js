import { useCallback, useEffect, useState } from 'react';
import tripEnquiryService from '../services/tripEnquiryService';

export default function useTripEnquiries(initialStatus = '') {
  const [items, setItems] = useState([]);
  const [loadedStatus, setLoadedStatus] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(initialStatus);

  const load = useCallback(async () => {
    try {
      const data = await tripEnquiryService.list(status ? { status } : {});
      setItems(data.items);
      setError(null);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not load enquiries');
    } finally {
      setLoadedStatus(status);
      setRefreshing(false);
    }
  }, [status]);

  useEffect(() => {
    let mounted = true;
    tripEnquiryService.list(status ? { status } : {})
      .then((data) => {
        if (!mounted) return;
        setItems(data.items);
        setError(null);
      })
      .catch((err) => {
        if (mounted) setError(err?.response?.data?.message || 'Could not load enquiries');
      })
      .finally(() => {
        if (mounted) setLoadedStatus(status);
      });

    return () => {
      mounted = false;
    };
  }, [status]);

  const refetch = useCallback(() => {
    setRefreshing(true);
    return load();
  }, [load]);

  return { items, loading: refreshing || loadedStatus !== status, error, status, setStatus, refetch };
}
