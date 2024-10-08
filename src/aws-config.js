const awsconfig = {
    Auth: {
        identityPoolId: `${process.env.REACT_APP_IDENTITY_POOL_ID}`,
        region: `${process.env.REACT_APP_REGION}`,
        identityPoolRegion: `${process.env.REACT_APP_REGION}`,
        userPoolId: `${process.env.REACT_APP_USER_POOL_ID}`,
        userPoolWebClientId: `${process.env.REACT_APP_USER_POOL_CLIENT_ID}`,
    }
};

console.log("Identity Pool ID:", awsconfig.Auth.identityPoolId);
console.log("User Pool ID:", awsconfig.Auth.userPoolId);
console.log("User Pool Client ID:", awsconfig.Auth.userPoolWebClientId);
console.log("Region:", awsconfig.Auth.region);

export default awsconfig;