export const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  optionsSuccessStatus: 200,
};

export const corsOptionsInServer = {
  cors: {
    origin: corsOptions.origin,
    methods: ["GET", "POST"],
    credentials: true,
  },
};
