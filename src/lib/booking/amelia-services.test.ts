import { describe, expect, it } from "vitest";

import { BOOKING_SERVICES } from "./provider";
import { AMELIA_SERVICE_IDS, getVerifiedAmeliaServiceId } from "./amelia-services";

describe("Amelia service mapping", () => {
  it("contains no guessed service identifier before backend validation", () => {
    expect(AMELIA_SERVICE_IDS).toEqual({});
    for (const service of BOOKING_SERVICES) {
      expect(getVerifiedAmeliaServiceId(service.key)).toBeNull();
    }
  });
});
