import React from 'react';
import { AzureMap } from 'react-azure-maps';
import { AuthenticationType } from 'azure-maps-control';

const option = {
    center: [173.718680632181, -41.5375314820192],
    zoom: 12.5,
    view: 'Auto',
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: 'bClzgseYzso3ar7x2XdVa8dd8Xs62GO0qJCUPPnDaZg',
    },
};

const MapComponent = () => {
    return (
        <AzureMap options={option} />
    );
};

export default MapComponent;