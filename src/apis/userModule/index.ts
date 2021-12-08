import { sendGet, sendUpload, sendUploadAvt, sendPut, sendDelete } from '../axios';
export const changePassword = (password: any) => sendPut('user/change-password', password);
export const getProfile = (id: any) => sendGet(`users/${id}/cv`);
export const updateProfile = (data: any) => sendPut('user/cv', data);
export const getReviewsById = (id: any, filters: any) => sendGet(`users/${id}/reviews`, filters);
export const getReviewsByUser = (id: any, filters: any) => sendGet(`users/${id}/reviewsByUser`, filters);
export const handleUploadAvt = (file: any) => sendUploadAvt(`user/avatar`, file);
export const handleUploadCertification = (file: any) => sendUpload(`user/certification`, file);
export const handleDeleteCertification = (file_name: any) => sendDelete('user/certifications', { certifications: [file_name] })
export const getCurUser = () => sendGet('user');
export const getListJobUser = (userId: string, type: string, filters?: any) => sendGet(`users/${userId}/jobs/${type}`, filters ? filters : '');
