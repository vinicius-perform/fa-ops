import { AdsProvider } from "./AdsProvider";
import { MockAdsProvider } from "./MockAdsProvider";

let _provider: AdsProvider = new MockAdsProvider();

export function getAdsProvider(): AdsProvider {
  return _provider;
}

export function isDemoMode(): boolean {
  return _provider.kind === "mock";
}

export * from "./AdsProvider";
export { MockAdsProvider };
