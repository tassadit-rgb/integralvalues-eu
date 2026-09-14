import type { BookingServiceKey } from "./provider";

/**
 * Identifiants publics Amelia confirmés par l’administrateur du backend.
 *
 * La table reste volontairement vide tant que les services Amelia n’ont pas été
 * vérifiés. Il est interdit de déduire ou d’inventer ces identifiants.
 */
export const AMELIA_SERVICE_IDS: Partial<Record<BookingServiceKey, number>> = {};

export function getVerifiedAmeliaServiceId(serviceKey: BookingServiceKey) {
  return AMELIA_SERVICE_IDS[serviceKey] ?? null;
}
