import NodeCache from "node-cache";

export const dbCache = new NodeCache({ stdTTL: 3600 });
