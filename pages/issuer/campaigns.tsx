import React from 'react';
import { NextPage } from 'next';
import AdminLayout from '../../components/Layouts/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { IssuerCampaignService } from '../../services/Issuer/Issuer_CampaignService';
import SearchForm from '../../components/Admin/SearchForm';
import AdminCampaignCard from '../../components/Admin/AdminCampaignCard';

const IssuerCampaignsPage: NextPage = () => {
    const { loginUser } = useAuth();
    const issuerCampaignService = new IssuerCampaignService(
        loginUser?.accessToken
    );

    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(20);

    const { data: campaigns } = useQuery(['issuer_campaigns', page], () =>
        issuerCampaignService.getCampaigns$Issuer({
            page: page,
            size: pageSize,
        })
    );
    return (
        <AdminLayout>
            <div className="sm:tw-flex sm:tw-justify-between sm:tw-items-center tw-mb-8">
                {/* Left: Title */}
                <div className="tw-mb-4 sm:tw-mb-0">
                    <h1 className="tw-text-2xl md:tw-text-3xl tw-text-slate-800 tw-font-bold">
                        Sự kiện ✨
                    </h1>
                </div>

                {/* Right: Actions */}
                <div className="tw-grid tw-grid-flow-col sm:tw-auto-cols-max tw-justify-start sm:tw-justify-end tw-gap-2">
                    {/* Search form */}
                    <SearchForm />
                    {/*/!* Filter button *!/*/}
                    {/*<FilterButton align="right" />*/}
                    {/* Create campaign button */}
                </div>
            </div>
            <div className="tw-grid tw-grid-cols-12 tw-gap-6">
                {campaigns?.data?.map((campaign) => (
                    <div
                        key={campaign.id}
                        className={
                            'tw-col-span-full sm:tw-col-span-6 xl:tw-col-span-4'
                        }
                    >
                        <AdminCampaignCard campaign={campaign} />
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
};

export default IssuerCampaignsPage;
