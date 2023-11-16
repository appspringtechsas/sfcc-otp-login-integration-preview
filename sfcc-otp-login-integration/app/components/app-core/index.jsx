/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useContext} from 'react'
import {ChakraProvider} from '@appspringtechsas/sfcc-otp-login-integration/app/components/shared/ui'

// Removes focus for non-keyboard interactions for the whole application
import 'focus-visible/dist/focus-visible'

import {MultiSiteProvider, TokenContext} from '@appspringtechsas/sfcc-otp-login-integration/app/contexts'
import {CommerceApiProvider} from '@salesforce/commerce-sdk-react'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

/**
 * Use the AppConfig component to inject extra arguments into the getProps
 * methods for all Route Components in the app – typically you'd want to do this
 * to inject a connector instance that can be used in all Pages.
 *
 * You can also use the AppConfig to configure a state-management library such
 * as Redux, or Mobx, if you like.
 */
const AppCore = ({
    children,
    shortCode,
    clientId,
    organizationId,
    siteId,
    locale,
    currency,
    redirectURI,
    proxy,
    headers,
    OCAPISessionsURL,
    site,
    msLocale,
    buildUrl,
    theme
}) => {

    const { fetchToken } = useContext(TokenContext)

    return (
        <CommerceApiProvider
            shortCode={shortCode}
            clientId={clientId}
            organizationId={organizationId}
            siteId={siteId}
            locale={locale}
            currency={currency}
            redirectURI={redirectURI}
            proxy={proxy}
            headers={headers}
            OCAPISessionsURL={OCAPISessionsURL}
            fetchedToken={fetchToken}
        >
            <MultiSiteProvider site={site} locale={msLocale} buildUrl={buildUrl}>
                <ChakraProvider theme={theme}>{children}</ChakraProvider>
            </MultiSiteProvider>
            <ReactQueryDevtools />
        </CommerceApiProvider>
    )
}

export default AppCore