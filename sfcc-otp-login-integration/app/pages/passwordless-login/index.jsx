/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import { Container } from '@appspringtechsas/sfcc-otp-login-integration/app/components/shared/ui'
import PasswordlessLoginForm from '@appspringtechsas/sfcc-otp-login-integration/app/components/passwordless-login/form'
import useNavigation from '@appspringtechsas/sfcc-otp-login-integration/app/hooks/use-navigation'

const PasswordlessLogin = () => {
    const navigate = useNavigation()

    return (    
        <Container
            paddingTop={16}
            width={['100%', '407px']}
            bg="white"
            paddingBottom={14}
            marginTop={8}
            marginBottom={8}
            borderRadius="base"
        >
            <PasswordlessLoginForm
                clickCreateAccount={() => navigate('/registration')}
            />
        </Container>
    )
}

export default PasswordlessLogin
