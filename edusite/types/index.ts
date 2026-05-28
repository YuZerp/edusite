export interface Course {
    id: number;
    title: string;
    subject: string;
    duration: string;
    price: number;
    description: string;
}

export interface Teacher {
    id: number;
    name: string;
    subjects: string[];
    experience: string;
    bio: string;
}

export interface RequestFormData {
    name: string;
    phone: string;
    subject: string;
    grade: string;
}