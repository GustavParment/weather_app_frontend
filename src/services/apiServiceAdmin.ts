export interface AdminData {
    email: string;
    password: string;
    fullName: string;
  }
  
  export const createAdmin = async (
    adminData: AdminData,
    token: string
  ): Promise<any> => {
    const response = await fetch("https://localhost:8443/admin/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(adminData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create admin");
    }
  
    return await response.json();
  };
  