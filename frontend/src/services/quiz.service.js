import { axiosClient } from "../lib/apiConfig";

export const getCategories = async () => {
  const response = await axiosClient.get("/categories");
  return response.data;
};

export const createQuiz = async (quizData) => {
  const response = await axiosClient.post("/quizzes", quizData);
  return response.data;
};

export const createQuestion = async (questionData) => {
  const response = await axiosClient.post("/questions", questionData);
  return response.data;
};

export const bulkUploadQuestions = async (quizId, questions) => {
  const response = await axiosClient.post(`/questions/bulk/${quizId}`, { questions });
  return response.data;
};

export const generateQuizAI = async (generateData) => {
  const response = await axiosClient.post("/ai/generate", generateData);
  return response.data;
};

export const getQuizzesAdmin = async (params = {}) => {
  const response = await axiosClient.get("/quizzes", { params });
  return response.data;
};

export const updateQuiz = async (quizId, quizData) => {
  const response = await axiosClient.put(`/quizzes/${quizId}`, quizData);
  return response.data;
};

export const deleteQuiz = async (quizId) => {
  const response = await axiosClient.delete(`/quizzes/${quizId}`);
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await axiosClient.post("/categories", categoryData);
  return response.data;
};

export const updateCategory = async (categoryId, categoryData) => {
  const response = await axiosClient.put(`/categories/${categoryId}`, categoryData);
  return response.data;
};

export const deleteCategory = async (categoryId) => {
  const response = await axiosClient.delete(`/categories/${categoryId}`);
  return response.data;
};

export const getQuizQuestions = async (quizId) => {
  const response = await axiosClient.get(`/quizzes/${quizId}/questions`);
  return response.data;
};

export const updateQuestion = async (questionId, questionData) => {
  const response = await axiosClient.put(`/questions/${questionId}`, questionData);
  return response.data;
};

export const deleteQuestion = async (questionId) => {
  const response = await axiosClient.delete(`/questions/${questionId}`);
  return response.data;
};


// get all quizzes

export const getAllQuizzes = async (params) => {
  const response = await axiosClient.get('/quizzes', { params });
  return response.data
}