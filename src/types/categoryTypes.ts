/* ---------- Category ---------- */

export interface CreateCategoryRequest {
  title: string;
  englishTitle: string;
  description: string;
}

export interface EditCategoryRequest {
  categoryId: string;
  data: CreateCategoryRequest;
}

export interface Category {
  _id: string;
  title: string;
  englishTitle: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
