// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Link } from '@inertiajs/react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
            <Head title="Forgot password" />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            <div className="account-wrapper" data-aos="fade-up">
                <div className="account-body">
                    <h4 className="title mb-20">Reset Password</h4>
                    <form className="account-form" onSubmit={submit}>
                        <div className="form-group">
                            <label className="reset-wd" htmlFor="sign-up">Enter your <strong>email address</strong> below, and we'll send you a link to reset your password. </label>
                            <Input
                                id="email"
                                type="email"
                                name="Enter your email"
                                autoComplete="off"
                                value={data.email}
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                            />

                        <InputError message={errors.email} />
                        </div>
                        <div className="form-group text-center">
                            <Button className="w-full mt-2 mb-2" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Email password reset link
                            </Button>
                            {/* <button type="submit" className="mt-2 mb-2">Reset Password</button> */}
                        </div>
                    </form>
                </div>
                <div className="or">
                    <span>OR</span>
                </div>
                <div className="account-header pb-0">
                    <span className="d-block mt-2">Or, return to <Link href={route('login')}>log in</Link></span>
                </div>
            </div>
            {/* <div className="space-y-6">
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="my-6 flex items-center justify-start">
                        <Button className="w-full" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Email password reset link
                        </Button>
                    </div>
                </form>

                <div className="text-muted-foreground space-x-1 text-center text-sm">
                    <span>Or, return to</span>
                    <TextLink href={route('login')}>log in</TextLink>
                </div>
            </div> */}
        </AuthLayout>
    );
}
