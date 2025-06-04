'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function setCookieAction(formData: FormData) {
  const value = formData.get('value') as string;

  const cookieStore = cookies();
  cookieStore.set('my-cookie-name', value, {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });

  redirect('/');
}

export default function AskUserPage() {
  return (
    <form action={setCookieAction}>
      <label>
        Enter value:
        <input type="text" name="value" />
      </label>
      <button type="submit">Set Cookie</button>
    </form>
  );
}
