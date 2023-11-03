# Email Passwordless Login cartridge

This is the *email_passwordless_login* cartridge that includes the controller: *EmailPasswordlessLogin.js*. *EmailPasswordlessLogin.js* provides the functionalities to call the SLAS authorization endpoint for passwordless login, to send the email to the user with the OTP token and to 

# Getting Started

1. Run `npm install` to install all of the local dependencies

2. Create `dw.json` file in the root of the project. Providing a [WebDAV access key from BM](https://documentation.b2c.commercecloud.salesforce.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Fadmin%2Fb2c_access_keys_for_business_manager.html) in the `password` field is optional, as you will be prompted if it is not provided.
```json
{
    "hostname": "your-sandbox-hostname.demandware.net",
    "username": "AM username like me.myself@company.com",
    "password": "your_webdav_access_key",
    "code-version": "version_to_upload_to"
}
```

3. Run `npm run uploadCartridge`. It will upload `email_passwordless_login` cartridge to the sandbox you specified in `dw.json` file.

4. Add the `email_passwordless_login` cartridge to your cartridge path in _Administration >  Sites >  Manage Sites > RefArch - Settings_. It must be added _before_ the path for `app_storefront_base`. Example path: `email_passwordless_login:app_storefront_base`

5. This cartridge requires that you create two http services in the sandbox: _passwordless-login.http.accesstoken.post_ and _passwordless-login.http.authorizecustomer.post_

    5.1. First, go to _Administration > Operations > Services_ and go to the _Credentials_ tab. In there create two credentials: _http.sfcc.accesstoken.cred_ and _http.sfcc.authorizecustomer.cred_. For _http.sfcc.accesstoken.cred_ enter that name in the input field for that, in the URL field enter **https://<your-short-code>.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/<your-organization-ID>/oauth2/passwordless/token**, in the user field enter your **private client ID** and in password enter your **private client secret**. For _http.sfcc.authorizecustomer.cred_ is something similar; use that name in the name field, in the URL field enter **https://<your-short-code>.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/<your-organization-ID>/oauth2/passwordless/login** , in user field enter **private client ID** and in password enter your **private client secret**

    5.2. After creating the credentials go to _Administration > Operations > Services_ and go to the _Profiles_ tab. In there create two new profiles: one with name _passwordless-login.profile_ and Connection Timeout of _5,000_ and the other one with name _passwordless-authorize.profile_ with and Connection Timeout of _5,000_

    5.3. Finally, go to _Administration > Operations > Services_ and go to the _Services_ tab and create the two new services. The first one needs to be called _passwordless-login.http.accesstoken.post_, its type must HTTP, the service must be enabled, log name prefix should be _pwdlesslogin-accesstoken_, check the Force PRD Behavior in Non-PRD Environments, in the profile selector choose _passwordless-login.profile_ and in the credentials selector choose _http.sfcc.accesstoken.cred_ and save the service. The second service needs to be called _passwordless-login.http.authorizecustomer.post_ its type must HTTP, the service must be enabled, log name prefix should be _pwdlesslogin-authcustomer_, check the Force PRD Behavior in Non-PRD Environments, in the profile selector choose _passwordless-authorize.profile_ and in the credentials selector choose _http.sfcc.authorizecustomer.cred_ and save the service

6. This cartridge also requires that you create three new attributes in the site preferences in the sandbox

    6.1. Go to _Administration > Site Development > System Object Types_ and in the list search for the **SitePreferences** object, click it an go to the _Attribute Definitions_ tab.

    6.2. Create the first attribute with ID **pwdlessLoginAttemptTime**, name _Login Attempt Time Window_ (name can be different but ID needs to be the one specified here) and Value Type must be **Integer**

    6.3. Create the second attribute with ID **siteId**, name _Site ID_ (name can be different but ID needs to be the one specified here) and Value Type must be **String**

    6.4. Create the third attribute with ID **tenantId** name _Tenant ID_ (name can be different but ID needs to be the one specified here) and Value Type must be **String**

    6.5. After creating the attributes, go to the _Attribute Grouping_ tab and create a new group. This group should have **PasswordlessLoginGroup** as ID and **Passwordless Login Configurations**. Edit the group to add the three attributes that you just created

    6.6. Finally, go to _Merchant Tools > Site Preferences > Custom Site Preferences_ and click on the **PasswordlessLoginGroup**. In there, you will need to add values for the three new attributes: **pwdlessLoginAttemptTime** indicates how many minutes does an user needs to wait before they can try to login again. **tenantId** is the value of your tenant ID, which is something like this <your-realm-ID>-<your-instance-ID>  (e.g. zxxx-000). **siteId** is the ID for the site that you will be using, typically is **RefArch**

7. The cartridge needs the creation of a custom object. For this, go to _Administration > Site Development > Custom Object Types_ and create the new object. The ID for this object must be **PasswordlessLoginAttempt** and the Key Attribute must be **loginEmail** and save the object. Then, go to _Attribute Definitions_ tab and create a new attribute with ID **attempts**, Value Type **Integer**, check the Mandatory field and the Externally Managed field and save. FInally, go to _Attribute Grouping_ tab and create a group with **PasswordlessLoginAttempts** as ID and **Passwordless Login Attempts** as name, edit the group and add the attributes **loginEmail** and **attempts**

8. If you followed all the steps, you should now be ready to use this catridge.

## Uploading

`npm run uploadCartridge` - Will upload `email_passwordless_login` to the server. Requires a valid `dw.json` file at the root that is configured for the sandbox to upload.