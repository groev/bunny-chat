export const api = {
  post: async (url: string, data: any) => {
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const response = await fetch(`${baseUrl}/api${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  },

  get: async (url: string) => {
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const response = await fetch(`${baseUrl}/api${url}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  },
};
