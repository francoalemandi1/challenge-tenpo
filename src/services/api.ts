import axios from 'axios';
import { authService } from './auth';

// Create an axios instance
export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout();
    }
    return Promise.reject(error);
  }
);

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  hasMore: boolean;
  total: number;
  nextPage: number | null;
}

export interface PostsQueryParams {
  page: number;
  limit?: number;
}

const MAX_POSTS = 2000;
const PAGE_SIZE = 100;

export const apiService = {
  async getPosts({ page = 1 }: PostsQueryParams): Promise<PaginatedResponse<Post>> {
    // Ensure we don't exceed the maximum number of posts
    const startIndex = (page - 1) * PAGE_SIZE;
    if (startIndex >= MAX_POSTS) {
      return {
        data: [],
        hasMore: false,
        total: MAX_POSTS,
        nextPage: null,
      };
    }

    try {
      // Get all 100 base posts
      const response = await api.get<Post[]>('/posts');
      const basePosts = response.data;

      // Calculate how many posts we need for this page
      const postsNeeded = Math.min(PAGE_SIZE, MAX_POSTS - startIndex);
      const currentPagePosts: Post[] = [];

      // Generate the posts for this page
      for (let i = 0; i < postsNeeded; i++) {
        const basePost = basePosts[i % basePosts.length];
        const globalIndex = startIndex + i;
        currentPagePosts.push({
          ...basePost,
          id: globalIndex + 1,
          title: `${basePost.title} (${Math.floor(globalIndex / basePosts.length) + 1})`,
        });
      }

      const hasMore = startIndex + PAGE_SIZE < MAX_POSTS;

      return {
        data: currentPagePosts,
        hasMore,
        total: MAX_POSTS,
        nextPage: hasMore ? page + 1 : null,
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // Prefetch next page
  prefetchPosts(page: number, limit = 20) {
    this.getPosts({ page, limit }).catch(() => {
      // Silently fail for prefetch
    });
  },
}; 