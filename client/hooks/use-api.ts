// hooks/use-api.ts
import { useState, useCallback } from 'react';
import { apiClient } from '@/utils/api-client';
import { useToast } from './use-toast';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const callApi = useCallback(async (method: 'get' | 'post' | 'put' | 'delete', url: string, data?: any) => {
    setLoading(true);
    try {
      const response = await apiClient[method](url, data);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'حدث خطأ';
      toast({
        title: "خطأ",
        description: message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return { callApi, loading };
};