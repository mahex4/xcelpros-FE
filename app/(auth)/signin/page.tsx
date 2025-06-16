import BackButton from '@/components/BackButton';
import SignInForm from './_components/SignInForm';

export default async function SignInPage({
    searchParams,
}: {
        searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const demoEmail = typeof params?.email === 'string' ? params.email : undefined;
    const demoPassword = typeof params?.password === 'string' ? params.password : undefined;

    return (<div className="w-full relative">
        <div className="fixed p-5 flex gap-2 justify-center items-center">
            <BackButton />
            <span className=' font-medium text-xl'>Home</span>
        </div>
        <SignInForm
            demoEmail={demoEmail}
            demoPassword={demoPassword}
        />
    </div>
    );
}
