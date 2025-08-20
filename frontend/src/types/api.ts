export interface HomeApiResponse {
  message: string;
  status: string;
  data: {
    title: string;
    description: string;
    version: string;
  };
}