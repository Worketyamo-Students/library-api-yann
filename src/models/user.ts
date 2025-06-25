export interface UserCreateInput {
    name: string;
    email: string;
    password: string;
  }
  
  export interface UserUpdateInput {
    name?: string;
    email?: string;
    password?: string;
  }