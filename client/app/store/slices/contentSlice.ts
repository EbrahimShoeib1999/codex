// app/store/slices/contentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  Section, 
  Project, 
  Service, 
  FAQ, 
  PricingPlan,
  TeamMember,
  Testimonial 
} from '@/types/content';
import { apiClient } from '@/utils/api-client';

interface ContentState {
  sections: Record<string, Section>;
  projects: Project[];
  services: Service[];
  faqs: FAQ[];
  pricingPlans: PricingPlan[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  sections: {},
  projects: [],
  services: [],
  faqs: [],
  pricingPlans: [],
  teamMembers: [],
  testimonials: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (_, { rejectWithValue }) => {
    try {
      const [sectionsRes, projectsRes, servicesRes, faqsRes, pricingRes, teamRes, testimonialsRes] = 
        await Promise.all([
          apiClient.get('/api/content/sections'),
          apiClient.get('/api/content/projects'),
          apiClient.get('/api/content/services'),
          apiClient.get('/api/content/faqs'),
          apiClient.get('/api/content/pricing'),
          apiClient.get('/api/content/team'),
          apiClient.get('/api/content/testimonials')
        ]);

      return {
        sections: sectionsRes.data,
        projects: projectsRes.data,
        services: servicesRes.data,
        faqs: faqsRes.data,
        pricingPlans: pricingRes.data,
        teamMembers: teamRes.data,
        testimonials: testimonialsRes.data,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch content');
    }
  }
);

export const updateSection = createAsyncThunk(
  'content/updateSection',
  async ({ id, data }: { id: string; data: Partial<Section> }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/api/content/sections/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update section');
    }
  }
);

export const createProject = createAsyncThunk(
  'content/createProject',
  async (data: Partial<Project>, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/api/content/projects', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create project');
    }
  }
);

export const updateProject = createAsyncThunk(
  'content/updateProject',
  async ({ id, data }: { id: string; data: Partial<Project> }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/api/content/projects/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update project');
    }
  }
);

export const deleteProject = createAsyncThunk(
  'content/deleteProject',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/api/content/projects/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete project');
    }
  }
);

// خدمات مماثلة للأنواع الأخرى
export const createService = createAsyncThunk(
  'content/createService',
  async (data: Partial<Service>, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/api/content/services', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create service');
    }
  }
);

export const updateService = createAsyncThunk(
  'content/updateService',
  async ({ id, data }: { id: string; data: Partial<Service> }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/api/content/services/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update service');
    }
  }
);

export const deleteService = createAsyncThunk(
  'content/deleteService',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/api/content/services/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete service');
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchContent
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload.sections.reduce(
          (acc: Record<string, Section>, section: Section) => ({
            ...acc,
            [section.id]: section,
          }),
          {}
        );
        state.projects = action.payload.projects;
        state.services = action.payload.services;
        state.faqs = action.payload.faqs;
        state.pricingPlans = action.payload.pricingPlans;
        state.teamMembers = action.payload.teamMembers;
        state.testimonials = action.payload.testimonials;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // updateSection
      .addCase(updateSection.fulfilled, (state, action) => {
        const updatedSection = action.payload;
        state.sections[updatedSection.id] = updatedSection;
      })
      // createProject
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      // updateProject
      .addCase(updateProject.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        const index = state.projects.findIndex(project => project.id === updatedProject.id);
        if (index !== -1) {
          state.projects[index] = updatedProject;
        }
      })
      // deleteProject
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(project => project.id !== action.payload);
      })
      // createService
      .addCase(createService.fulfilled, (state, action) => {
        state.services.push(action.payload);
      })
      // updateService
      .addCase(updateService.fulfilled, (state, action) => {
        const updatedService = action.payload;
        const index = state.services.findIndex(service => service.id === updatedService.id);
        if (index !== -1) {
          state.services[index] = updatedService;
        }
      })
      // deleteService
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter(service => service.id !== action.payload);
      });
  },
});

export const { clearError } = contentSlice.actions;
export default contentSlice.reducer;