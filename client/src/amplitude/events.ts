import {sendAmplitudeEvent} from "./useAmplitude";

export const APP = 'min-ia';

export const sendSidevisningEvent = () => {
    sendAmplitudeEvent({
        eventName: 'sidevisning',
        eventProperties: {
            app: APP,
            url: window.location.pathname,
        },
    });
};
