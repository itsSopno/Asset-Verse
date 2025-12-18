// services/inventory.js
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

/**
 * Fetch employee's inventory
 * @param {string} token - Firebase ID token
 * @returns {Promise<{items: Array}>}
 */
export const getMyInventory = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/my-inventory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    // expected response: { employeeEmail, employeeName, hrEmail, companyName, items: [...] }
    return data
  } catch (error) {
    console.error('Failed to fetch inventory:', error)
    return { items: [] }
  }
}

/**
 * Return an assigned asset
 * @param {string} assetId
 * @param {string} token
 */
export const returnAsset = async (assetId, token) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/return-asset`,
      { assetId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return data
  } catch (error) {
    console.error('Failed to return asset:', error)
    throw error
  }
}

/**
 * Fetch inventory history
 */
export const getInventoryHistory = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/inventory-history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error) {
    console.error('Failed to fetch inventory history:', error)
    return []
  }
}
