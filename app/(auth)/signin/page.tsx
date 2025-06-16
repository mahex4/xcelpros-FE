import SignInForm from './_components/SignInForm';

export default async function SignInPage({
    searchParams,
}: {
        searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const demoEmail = typeof params?.email === 'string' ? params.email : undefined;
    const demoPassword = typeof params?.password === 'string' ? params.password : undefined;

    return (
        <SignInForm
            demoEmail={demoEmail}
            demoPassword={demoPassword}
        />
    );
}
