import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Link } from '@inertiajs/react';
import GoogleIcon from '/resources/img/icon/google.png';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Log in" >
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet" />
            </Head>

            <div className="account-wrapper aos-init aos-animate" data-aos="fade-up">
                <div className="account-body">
                    <h4 className="title mb-20">Welcome To redr.io</h4>
                    <form className="account-form" onSubmit={submit}>
                        <div className="form-group">
                            <label htmlFor="sign-up">Your Email </label>
                            <input
                                type="text"
                                id="sign-up"
                                required
                                autoFocus
                                tabIndex={1}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter Your Email"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">Password</label>
                            <input type="password"
                                id="pass"
                                required
                                tabIndex={2}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter Your Password"
                            />
                            <InputError message={errors.password} />
                            <TextLink href={route('password.request')} className="sign-in-recovery">Forgot your password? <a href="forgot-password.html">recover password</a></TextLink>
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="mt-2 mb-2">Sign In</button>
                        </div>
                    </form>
                </div>
                <div className="or">
                    <span>OR</span>
                </div>
                <div className="account-header pb-0">
                    <span className="d-block mt-2">Sign up with your work email</span>
                    <a href="#0" className="sign-in-with"><img src={GoogleIcon} alt="icon" /><span>Sign In with Google</span></a>
                    <span className="d-block mt-15">Don't have an account? <Link href={route('register')}>Sign Up Here</Link></span>
                </div>
            </div>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
