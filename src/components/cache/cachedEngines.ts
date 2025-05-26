import apicalls from "ducks/apicalls";
import { CryptoEngine } from "ducks/features/cas/models";

let cache: CryptoEngine[] | null = null;

const enginesCache = {
    get: (): CryptoEngine[] | null => cache,
    set: (data: CryptoEngine[]) => {
        cache = data;
    },
    clear: () => {
        cache = null;
    }
};

const useCachedEngines = () => {
    const getEnginesData = async (): Promise<CryptoEngine[]> => {
        const cached = enginesCache.get();
        if (cached) {
            console.debug("Getting engines from cache");
            return cached;
        }

        const data = await apicalls.cas.getEngines();
        enginesCache.set(data);
        console.debug("Fetching engines from API");
        return data;
    };

    const clearEnginesCache = () => {
        enginesCache.clear();
    };

    return { getEnginesData, clearEnginesCache };
};

export default useCachedEngines;
