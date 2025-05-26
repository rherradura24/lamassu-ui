import apicalls from "ducks/apicalls";
import caCache from "./cache";
import { CertificateAuthority } from "ducks/features/cas/models";

const useCachedCA = () => {
    const getCAData = async (caID: string): Promise<CertificateAuthority> => {
        const cached = caCache.get(caID);
        if (cached) {
            console.log("Getting CA from cache: ", caID);
            return cached;
        }

        const data = await apicalls.cas.getCA(caID);
        caCache.set(caID, data);
        console.log("Fetching CA: ", caID);
        return data;
    };

    const clearCaCache = () => {
        caCache.clear();
    };

    return { getCAData, clearCaCache };
};

export default useCachedCA;
