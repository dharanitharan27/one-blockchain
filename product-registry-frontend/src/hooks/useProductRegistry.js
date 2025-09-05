import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contracts';

export const useProductRegistry = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState(null);

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        
        setProvider(provider);
        setContract(contract);
        setAccount(address);
        
        return { success: true, address };
      } catch (error) {
        console.error('Error connecting wallet:', error);
        return { success: false, error };
      }
    } else {
      return { success: false, error: 'MetaMask not installed' };
    }
  }, []);

  const registerProduct = async (
    name,
    category,
    dateOfHarvest,
    timeOfHarvest,
    farmLocation,
    qualityRating,
    pricePerUnit,
    description
  ) => {
    if (!contract) throw new Error('Contract not connected');
    
    const priceInWei = ethers.parseEther(pricePerUnit.toString());
    
    const tx = await contract.registerProduct(
      name,
      category,
      dateOfHarvest,
      timeOfHarvest,
      farmLocation,
      qualityRating,
      priceInWei,
      description
    );
    
    return await tx.wait();
  };

  const getProduct = async (id) => {
    if (!contract) throw new Error('Contract not connected');
    return await contract.getProduct(id);
  };

  const getAllProducts = async () => {
    if (!contract) throw new Error('Contract not connected');
    return await contract.getAllProducts();
  };

  return {
    contract,
    account,
    provider,
    connectWallet,
    registerProduct,
    getProduct,
    getAllProducts,
  };
};