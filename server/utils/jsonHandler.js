import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the backend JSON files
const DATA_DIR = path.join(__dirname, '../backend');

/**
 * Read data from a JSON file
 * @param {string} filename - The name of the JSON file (without extension)
 * @returns {Array} The parsed JSON data
 */
export function readJsonFile(filename) {
  try {
    const filePath = path.join(DATA_DIR, `${filename}.json`);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}.json:`, error);
    return [];
  }
}

/**
 * Write data to a JSON file
 * @param {string} filename - The name of the JSON file (without extension)
 * @param {Array} data - The data to write
 */
export function writeJsonFile(filename, data) {
  try {
    const filePath = path.join(DATA_DIR, `${filename}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${filename}.json:`, error);
    throw error;
  }
}

/**
 * Find an item by ID in a JSON array
 * @param {Array} items - The array to search
 * @param {string} id - The ID to find
 * @returns {Object|null} The found item or null
 */
export function findById(items, id) {
  return items.find(item => item.id === id || item.productId === id) || null;
}

/**
 * Find items by a property value
 * @param {Array} items - The array to search
 * @param {string} property - The property name
 * @param {*} value - The value to match
 * @returns {Array} Array of matching items
 */
export function findByProperty(items, property, value) {
  return items.filter(item => item[property] === value);
}

/**
 * Generate a unique ID
 * @returns {string} A unique ID
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

/**
 * Update an item in an array
 * @param {Array} items - The array containing the item
 * @param {string} id - The ID of the item to update
 * @param {Object} updates - The updates to apply
 * @returns {Object|null} The updated item or null if not found
 */
export function updateItem(items, id, updates) {
  const index = items.findIndex(item => item.id === id || item.productId === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates };
    return items[index];
  }
  return null;
}

/**
 * Remove an item from an array
 * @param {Array} items - The array containing the item
 * @param {string} id - The ID of the item to remove
 * @returns {boolean} True if item was removed, false if not found
 */
export function removeItem(items, id) {
  const index = items.findIndex(item => item.id === id || item.productId === id);
  if (index !== -1) {
    items.splice(index, 1);
    return true;
  }
  return false;
}
