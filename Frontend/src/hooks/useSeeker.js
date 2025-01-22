import { useContext } from 'react';
import { SeekerContext } from '../context/SeekerContext';

const useSeeker = () => {
  return useContext(SeekerContext);
};

export default useSeeker;

