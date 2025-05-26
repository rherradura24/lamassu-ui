import { CertificateAuthority } from "ducks/features/cas/models";

const caCache = new Map<string, CertificateAuthority>();

export default caCache;
