export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const CONTRACT_ABI = [
  "function registerProduct(string,string,string,string,string,string,uint256,string)",
  "function getProduct(uint256) view returns (tuple(uint256 id, string name, string category, string dateOfHarvest, string timeOfHarvest, string farmLocation, string qualityRating, uint256 pricePerUnit, string description, address farmer, bool isAvailable, uint256 createdAt))",
  "function getAllProducts() view returns (tuple(uint256 id, string name, string category, string dateOfHarvest, string timeOfHarvest, string farmLocation, string qualityRating, uint256 pricePerUnit, string description, address farmer, bool isAvailable, uint256 createdAt)[])",
  "function products(uint256) view returns (uint256 id, string name, string category, string dateOfHarvest, string timeOfHarvest, string farmLocation, string qualityRating, uint256 pricePerUnit, string description, address farmer, bool isAvailable, uint256 createdAt)"
];