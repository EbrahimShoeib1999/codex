import { create } from 'zustand';
import axios from 'axios';

interface Section {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

interface ContentStore {
  sections: Record<string, Section>;
  loading: boolean;
  error: string | null;
  fetchSections: () => Promise<void>;
  updateSection: (id: string, data: Partial<Section>) => Promise<void>;
}

// إعداد axios instance مخصصة
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useContentStore = create<ContentStore>((set, get) => ({
  sections: {},
  loading: false,
  error: null,

  fetchSections: async () => {
    set({ loading: true, error: null });
    try {
      const res = await apiClient.get('/api/content');
      const mapped = res.data.reduce(
        (acc: Record<string, Section>, section: Section) => ({
          ...acc,
          [section.id]: section,
        }),
        {}
      );
      set({ sections: mapped, loading: false });
    } catch (error: any) {
      console.error('Failed to fetch sections:', error);
      
      let errorMessage = 'Network error';
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.statusText;
      } else if (error.request) {
        errorMessage = 'No response from server - check CORS settings';
      } else {
        errorMessage = error.message;
      }
      
      set({ 
        loading: false, 
        error: errorMessage
      });
      
      // بيانات تجريبية للتنمية
      if (process.env.NODE_ENV === 'development') {
        const mockSections = {
          home: { id: 'home', title: 'Welcome to Our Website', subtitle: 'Innovative Solutions', description: 'We provide the best services in the industry with years of experience and expertise.' },
          about: { id: 'about', title: 'About Our Company', subtitle: 'Our Story', description: 'Founded in 2010, we have been serving clients worldwide with dedication and excellence.' },
          services: { id: 'services', title: 'Our Services', subtitle: 'What We Offer', description: 'We offer a wide range of services including web development, design, and digital marketing.' },
          portfolio: { id: 'portfolio', title: 'Our Portfolio', subtitle: 'Recent Work', description: 'Check out our latest projects and see the quality of our work for yourself.' },
          pricing: { id: 'pricing', title: 'Pricing Plans', subtitle: 'Choose Your Plan', description: 'We offer flexible pricing plans to suit businesses of all sizes and budgets.' },
          support: { id: 'support', title: 'Customer Support', subtitle: 'We Are Here to Help', description: 'Our support team is available 24/7 to assist you with any questions or issues.' },
          faq: { id: 'faq', title: 'Frequently Asked Questions', subtitle: 'Find Answers', description: 'Browse through our FAQ section to find answers to common questions.' },
          contact: { id: 'contact', title: 'Contact Us', subtitle: 'Get In Touch', description: 'Reach out to us for inquiries, quotes, or any other information you may need.' },
        };
        set({ sections: mockSections });
      }
    }
  },

  updateSection: async (id: string, data: Partial<Section>) => {
    set({ loading: true, error: null });
    try {
      const res = await apiClient.put(`/api/content/${id}`, data);
      const updatedSection = res.data;
      
      set((state) => ({
        sections: {
          ...state.sections,
          [id]: { ...state.sections[id], ...updatedSection },
        },
        loading: false,
      }));
    } catch (error: any) {
      console.error('Failed to update section:', error);
      
      let errorMessage = 'Network error';
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.statusText;
      } else if (error.request) {
        errorMessage = 'No response from server';
      } else {
        errorMessage = error.message;
      }
      
      set({ 
        loading: false, 
        error: errorMessage
      });
      throw error;
    }
  },
}));