import apicalls from "ducks/apicalls";
import { CertificateAuthority } from "ducks/features/cas/models";

const caCache = new Map<string, CertificateAuthority>();

const useCachedCA = () => {
    const getCAData = async (caID: string): Promise<CertificateAuthority> => {
        const cached = caCache.get(caID);
        if (cached) {
            console.debug("Getting CA from cache: ", caID);
            return cached;
        }

        const data = await apicalls.cas.getCA(caID);
        caCache.set(caID, data);
        console.debug("Fetching CA: ", caID);
        return data;
    };

    const clearCaCache = () => {
        caCache.clear();
    };

    return { getCAData, clearCaCache };
};

export default useCachedCA;
