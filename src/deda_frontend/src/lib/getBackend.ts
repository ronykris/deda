import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as deda_backend_idl } from '../../../declarations/deda_backend';

export const getBackend = async () => {
    const isLocal = process.env.DFX_NETWORK !== "ic";
    const host = isLocal ? "http://localhost:4943" : "https://ic0.app";

    const agent = new HttpAgent({ host: host });
    if (isLocal) {
        await agent.fetchRootKey().catch(err => {
            console.warn('Unable to fetch root key. Check to ensure that your local replica is running');
            console.error(err);
        });
    }
    const canisterId = process.env.CANISTER_ID_DEDA_BACKEND as string;
    const backend = Actor.createActor(deda_backend_idl as any, { agent, canisterId: canisterId });
    console.log(backend);
    return backend
}