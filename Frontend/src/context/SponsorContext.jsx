import React, { createContext, useState, useContext } from 'react';

export const SponsorContext = createContext();

export const useSponsor = () => useContext(SponsorContext);

const SponsorProvider = ({ children }) => {
  const [sponsorships, setSponsorships] = useState([]);

  const addSponsorship = (newSponsorship) => {
    setSponsorships([...sponsorships, newSponsorship]);
  };

  const removeSponsorship = (id) => {
    setSponsorships(sponsorships.filter((sponsorship) => sponsorship.id !== id));
  };

  return (
    <SponsorContext.Provider value={{ sponsorships, addSponsorship, removeSponsorship }}>
      {children}
    </SponsorContext.Provider>
  );
};

export default SponsorProvider;