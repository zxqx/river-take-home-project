import { images } from '@/constants/images';

export const getImageById = (id: string) => {
  return images[id as keyof typeof images];
};
