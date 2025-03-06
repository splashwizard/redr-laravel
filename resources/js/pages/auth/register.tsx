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
import GoogleIcon from '/resources/img/icon/google.png';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <div className="account-wrapper" data-aos="fade-up">
                <div className="account-body">
                    <h4 className="title mb-20">Let's get started</h4>
                    <form className="account-form" onSubmit={submit}>
                        <div className="form-group">
                            <label htmlFor="sign-up">Name </label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Full name"
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sign-up">Email address </label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">Password</label>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Password"
                            />
                            <InputError message={errors.password} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">Confirm password</label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="mt-2 mb-2">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Try It Now
                            </button>
                        </div>
                    </form>
                </div>
                <div className="or">
                    <span>OR</span>
                </div>
                <div className="account-header pb-0">
                    <span className="d-block mt-2">Sign up with your work email</span>
                    <a href="#0" className="sign-in-with"><img src={GoogleIcon} alt="icon" /><span>Sign Up with Google</span></a>
                    <span className="d-block mt-15">Already have an account? <Link href={route('login')}>Sign In</Link></span>
                </div>
            </div>
        </AuthLayout>
    );
}
