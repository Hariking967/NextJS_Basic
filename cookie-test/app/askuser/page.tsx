import React from "react";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
export default async function AskUserPage() {
    async function handleSubmit() {
            
        }
  return (
    <form action={ async function handleSubmit(formData: FormData){
        const value = formData.get('value') as string;
            const cookieStore = await cookies(); // ✅ don't await
            cookieStore.set('name', value, { path: '/', maxAge: 3600 });
            redirect('/');
    }}>
      <input type="text" name="value" />
      <button type="submit">Set Cookie</button>
    </form>
  );
}
