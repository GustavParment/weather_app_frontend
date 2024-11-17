export interface UserData {
    id: number;
    email: string;
    fullName: string;
    password: string;
    roles?: string[]; 
    createdAt: string | number; 
    updatedAt: string | number;
    role: {
      id: number;
      name: string;
      description: string;
      createdAt: string | number;
      updatedAt: string | number;
    };
    authorities: { authority: string }[];
    enabled: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
  }

const API_BASE_URL = "https://localhost:8443/api/v1/user";

function createRequestOptions(options: RequestInit = {}): RequestInit {
    const token = localStorage.getItem("token");
  
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    };
  
    return {
      ...options,
      headers,
    };
  }

  async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(
      `${API_BASE_URL}${url}`,
      createRequestOptions(options)
    );
  
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
      );
    }
  
    return response.json();
  }

  export const fetchUserById = (id:number): Promise<UserData> => {
    return request<UserData>(`/by/${id}`, {method:"GET"})
  };

  export const fetchAllUsers = () : Promise<UserData[]> => {
    return request<UserData[]>("/all", {method: "GET"})
  }


