// app/store/slices/mediaSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ImageItem, MediaState } from '@/types/media';
import { apiClient } from '@/utils/api-client';

const initialState: MediaState = {
  images: [],
  loading: false,
  error: null,
};

export const fetchImages = createAsyncThunk(
  'media/fetchImages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/api/media/images');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch images');
    }
  }
);

export const uploadImage = createAsyncThunk(
  'media/uploadImage',
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await apiClient.post('/api/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload image');
    }
  }
);

export const deleteImage = createAsyncThunk(
  'media/deleteImage',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/api/media/images/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete image');
    }
  }
);

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.images.push(action.payload);
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.images = state.images.filter(image => image.id !== action.payload);
      });
  },
});

export const { clearError } = mediaSlice.actions;
export default mediaSlice.reducer;