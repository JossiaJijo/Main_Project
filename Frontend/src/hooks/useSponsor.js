import { useContext } from 'react';
import { SponsorContext } from '../context/SponsorContext';

const useSponsor = () => {
  return useContext(SponsorContext);
};

export default useSponsor;