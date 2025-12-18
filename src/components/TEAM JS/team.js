// services/inventory.js
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

/**
 * Fetch team data for authenticated employee
 * @param {string} token - Firebase ID token
 * @returns {Promise<Array>} - Array of team entries
 */
export const getTeam = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/team`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    // data expected to be an array of team entries
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Failed to fetch team data:', error)
    return []
  }
}

/**
 * Return an assigned asset
 * @param {string} assetId - Asset ID to return
 * @param {string} token - Firebase ID token
 * @returns {Promise<Object>} - Response from server
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
 * Alias for getTeam to maintain naming consistency
 */
export const getMyTeam = getTeam
