import LoadingProgress from 'components/Commons/LoadingProgress';
import { useAuth } from 'context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AuthDecoration from './../../assets/images/LoginSignUp/auth-decoration.png';
import CoverImage from './../../assets/images/LoginSignUp/login-cover.jpeg';
import { getRoleById } from '../../constants/Roles';

export const inputClass: string =
    'tw-border-gray-200 tw-drop-shadow-sm tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 text-grey-darker';

type Props = {
    children: JSX.Element;
};

const LoginSignUpLayout: React.FC<Props> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const { loginUser } = useAuth();
    const router = useRouter();
    useEffect(() => {
        (async () => {
            if (loginUser) {
                await router.push(getRoleById(loginUser.role).defaultRoute);
            } else setLoading(false);
        })().catch((err) => console.log(err));
    }, [loginUser, router]);

    if (loading) {
        return <LoadingProgress />;
    }

    return (
        <main className="tw-bg-white">
            <div className="tw-relative tw-flex">
                {/* Content */}
                <div className="tw-w-full md:tw-w-1/2">
                    <div className="wl tw-flex tw-h-full tw-min-h-screen tw-flex-col">
                        {/* Header */}
                        <div>
                            <div className="tw-flex tw-h-16 tw-items-center tw-justify-between tw-px-4 sm:tw-px-6 lg:tw-px-8">
                                {/* Logo */}
                                <Link href={'/'} className={'tw-block'}>
                                    <svg
                                        width={32}
                                        height={32}
                                        viewBox="0 0 32 32"
                                    >
                                        <defs>
                                            <linearGradient
                                                x1="28.538%"
                                                y1="20.229%"
                                                x2="100%"
                                                y2="108.156%"
                                                id="logo-a"
                                            >
                                                <stop
                                                    stopColor="#A5B4FC"
                                                    stopOpacity={0}
                                                    offset="0%"
                                                />
                                                <stop
                                                    stopColor="#A5B4FC"
                                                    offset="100%"
                                                />
                                            </linearGradient>
                                            <linearGradient
                                                x1="88.638%"
                                                y1="29.267%"
                                                x2="22.42%"
                                                y2="100%"
                                                id="logo-b"
                                            >
                                                <stop
                                                    stopColor="#38BDF8"
                                                    stopOpacity={0}
                                                    offset="0%"
                                                />
                                                <stop
                                                    stopColor="#38BDF8"
                                                    offset="100%"
                                                />
                                            </linearGradient>
                                        </defs>
                                        <rect
                                            fill="#6366F1"
                                            width={32}
                                            height={32}
                                            rx={16}
                                        />
                                        <path
                                            d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                                            fill="#4F46E5"
                                        />
                                        <path
                                            d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                                            fill="url(#logo-a)"
                                        />
                                        <path
                                            d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                                            fill="url(#logo-b)"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="tw-mx-auto tw-my-auto tw-w-full tw-max-w-sm tw-px-4 tw-py-8">
                            {children}
                        </div>
                    </div>
                </div>
                {/* Image */}
                <div
                    className="tw-absolute tw-top-0 tw-right-0 tw-bottom-0 tw-hidden md:tw-block md:tw-w-1/2"
                    aria-hidden="true"
                >
                    <Image
                        className="tw-h-full tw-w-full tw-object-cover tw-object-center"
                        src={CoverImage}
                        width={760}
                        height={1024}
                        alt="Authentication image"
                    />
                    <div className="tw-absolute tw-top-1/4 tw-left-0 tw-ml-8 tw-hidden -tw-translate-x-1/2 lg:tw-block">
                        <Image
                            src={AuthDecoration}
                            width={218}
                            height={224}
                            alt="Authentication decoration"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoginSignUpLayout;
