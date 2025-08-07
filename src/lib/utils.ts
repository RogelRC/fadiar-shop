import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normaliza texto para búsquedas insensibles a tildes y caracteres especiales
 * @param text - El texto a normalizar
 * @returns Texto normalizado en minúsculas sin tildes ni caracteres especiales
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover diacríticos (tildes)
    .replace(/[ñ]/g, 'n') // Convertir ñ a n
    .replace(/[ü]/g, 'u') // Convertir ü a u
    .replace(/[ç]/g, 'c') // Convertir ç a c
    .replace(/[ß]/g, 'ss') // Convertir ß a ss
    .replace(/[æ]/g, 'ae') // Convertir æ a ae
    .replace(/[œ]/g, 'oe') // Convertir œ a oe
    .replace(/[^a-z0-9\s]/g, '') // Remover caracteres especiales excepto espacios
    .replace(/\s+/g, ' ') // Normalizar espacios múltiples
    .trim();
}

/**
 * Busca texto normalizado dentro de otro texto normalizado
 * @param searchText - El texto a buscar
 * @param targetText - El texto donde buscar
 * @returns true si se encuentra la coincidencia
 */
export function searchInText(searchText: string, targetText: string): boolean {
  const normalizedSearch = normalizeText(searchText);
  const normalizedTarget = normalizeText(targetText);
  return normalizedTarget.includes(normalizedSearch);
}
