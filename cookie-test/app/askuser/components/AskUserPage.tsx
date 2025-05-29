import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function handleSubmit(formData: FormData) {
        const value = formData.get('value') as string;
        const cookieStore = await cookies(); // ✅ don't await
        cookieStore.set('name', value, { path: '/', maxAge: 3600 });
        redirect('/');
    }