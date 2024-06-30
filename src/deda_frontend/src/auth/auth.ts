import { AuthClient } from "@dfinity/auth-client";

export const initAuthClient = async (): Promise<AuthClient> => {
  return await AuthClient.create();
};

export const loginWithII = async (authClient: AuthClient): Promise<string> => {
    let iiUrl;
    if (process.env.DFX_NETWORK === "local") {
        iiUrl = `http://localhost:4943/?canisterId=${process.env.CANISTER_ID}`;
      } else if (process.env.DFX_NETWORK === "ic") {
        iiUrl = `https://${process.env.CANISTER_ID}.ic0.app`;
      } else {
        iiUrl = `https://${process.env.CANISTER_ID}.dfinity.network`;
      }
  await authClient.login({
    //identityProvider: "https://identity.ic0.app/#authorize",
    identityProvider: iiUrl,
    onSuccess: () => {
      console.log("Login successful");
    },
  });
  return authClient.getIdentity().getPrincipal().toString();
};