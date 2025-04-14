
export type ClientTypeForm = {
    ci: string;
    name: string;
    lastname: string;
    birthdate: Date | null;
    email: string;
    phone: string;
    gender: string;
    country: string;
    address: string;
    image: File | null;
    type: string;
    role: string;
}