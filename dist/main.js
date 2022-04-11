const axios = require('axios');
const token = process.env['TOKEN'];
async function renameBranch(repo) {
    var _a;
    // list prs
    const allPrsResponse = await axios.get(`https://api.github.com/repos/${repo}/pulls`, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${token}`
        }
    });
    const allPrs = allPrsResponse.data;
    const prsCreatedByOpenApiAutomation = allPrs.filter(pr => { var _a; return ((_a = pr.user) === null || _a === void 0 ? void 0 : _a.login) === 'openapi-sdkautomation[bot]'; });
    for (const pr of prsCreatedByOpenApiAutomation) {
        const branchName = (_a = pr.head) === null || _a === void 0 ? void 0 : _a.ref;
        if (!branchName)
            continue;
        //rename branch name
        const newName = branchName.replace('sdkAuto', 'deprecated');
        console.log(`rename ${repo}:${branchName} to ${repo}:${newName}`);
        await axios.post(`https://api.github.com/repos/${repo}/branches/${branchName}/rename`, {
            new_name: newName
        }, {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `Bearer ${token}`
            },
        });
    }
}
async function main() {
    await renameBranch('azure-sdk/azure-sdk-for-js-pr');
    await renameBranch('azure-sdk/azure-sdk-for-go-pr');
    await renameBranch('azure-sdk/azure-sdk-for-java-pr');
    await renameBranch('azure-sdk/azure-sdk-for-python-pr');
    await renameBranch('azure-sdk/azure-sdk-for-net-pr');
    await renameBranch('azure-sdk/azure-sdk-for-js');
    await renameBranch('azure-sdk/azure-sdk-for-go');
    await renameBranch('azure-sdk/azure-sdk-for-java');
    await renameBranch('azure-sdk/azure-sdk-for-python');
    await renameBranch('azure-sdk/azure-sdk-for-net');
}
main();
//# sourceMappingURL=main.js.map