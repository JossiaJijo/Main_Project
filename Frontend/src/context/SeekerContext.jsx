import React, { createContext, useState, useContext } from 'react';

export const SeekerContext = createContext();

export const useSeeker = () => useContext(SeekerContext);

const SeekerProvider = ({ children }) => {
  const [proposals, setProposals] = useState([]);

  const addProposal = (newProposal) => {
    setProposals([...proposals, newProposal]);
  };

  const removeProposal = (id) => {
    setProposals(proposals.filter((proposal) => proposal.id !== id));
  };

  return (
    <SeekerContext.Provider value={{ proposals, addProposal, removeProposal }}>
      {children}
    </SeekerContext.Provider>
  );
};

export default SeekerProvider;