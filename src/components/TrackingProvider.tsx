"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";

export default function TrackingProvider() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [consent, setConsent] = useState<string | null>(null);

    // Load initial consent state and listen to changes
    useEffect(() => {
        const updateConsent = () => {
            try {
                const saved = localStorage.getItem("stitchbyte_cookie_consent");
                setConsent(saved);
            } catch (e) {
                console.error("Failed to load cookie consent status:", e);
            }
        };

        updateConsent();
        window.addEventListener("cookieConsentChanged", updateConsent);
        return () => {
            window.removeEventListener("cookieConsentChanged", updateConsent);
        };
    }, []);

    useEffect(() => {
        // Run tracking ONLY if cookie consent has been explicitly accepted
        if (consent !== "accepted") {
            return;
        }

        try {
            const params = {
                utmSource: searchParams?.get('utm_source') || searchParams?.get('source'),
                utmMedium: searchParams?.get('utm_medium'),
                utmCampaign: searchParams?.get('utm_campaign'),
                utmTerm: searchParams?.get('utm_term'),
                utmContent: searchParams?.get('utm_content'),
            };

            const existingTracking = localStorage.getItem('stitchbyte_tracking');
            let trackingData = existingTracking ? JSON.parse(existingTracking) : {};

            // If a source exists in current URL, overwrite stored tracking logic
            if (params.utmSource) {
                trackingData = { ...trackingData, ...params };
            }

            // Capture external Referrer
            if (!trackingData.referrer || trackingData.referrer === "") {
                const referrer = document.referrer;
                if (referrer && !referrer.includes(window.location.hostname)) {
                    trackingData.referrer = referrer;
                }
            }

            // Capture first landing page if not set
            if (!trackingData.landingPage) {
                trackingData.landingPage = window.location.href;
            }

            localStorage.setItem('stitchbyte_tracking', JSON.stringify(trackingData));

            // Log visit to server analytics
            fetch("/api/analytics/track", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    utmSource: trackingData.utmSource,
                    utmMedium: trackingData.utmMedium,
                    utmCampaign: trackingData.utmCampaign,
                    utmTerm: trackingData.utmTerm,
                    utmContent: trackingData.utmContent,
                    referrer: trackingData.referrer,
                    landingPage: trackingData.landingPage,
                    pathname: pathname,
                }),
            }).catch(() => {
                // Silently fail to protect visitor experience
            });
        } catch (err) {
            console.error("Tracking setup failed:", err);
        }
    }, [searchParams, pathname, consent]);

    return null; // Invisible component
}
