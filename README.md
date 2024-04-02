# Simple Proof of Concept for Feature Flags

As we all know, Feature flags is a not-so-new concept in programming and devOps strategies. They provide many benefits as:

- Separate deployments from releases.
- Mitigate deployment risks.
- Testing in production (yes, tdddhe last and necessary round).
- Manage access to specific users on beta releases.
- Dark launches: features that won’t be used in production until they are finished and working properly.
- Canary release: release a feature for just a few users to test it in prod.

You can even sell this idea to marketing for A/B experiments on Partner Communities or Customer communities in Salesforce.

But to keep it simple and stright to the point, I made a project in a Developer org, so my use case is simple and I tried to make it financial-oriented to keep it interesting.

Let's say there was a requirement to create a LWC to show the accounts credit scoring. The scope includes to list a few fields and show a bar chart comparing the client score and the media score for that industry. But off course, it can't be done in just one sprint, because it needs to query a webservice to get the MediaScore ... So we can approach this with a layered solution.

- First, we can deploy the MVC which includes the LWC and a few fields.
- Second, we can deploy whatever we finished on the chart part.
- And third, we can modify the chart to show the queried media score (on this topic, I created and deployed in a free host, a tiny webservice made in Rust that returns the media score per industry)

Please read the code (accountDetails LWC, scoreChart LWC, ScoreChartController and ScoreChartControllerTest apex classes) because ... *the truth is always on code*

In the second episode I'll add fflib, Nebula Logger and dependency injection to illustrate how to use them in a more complex scenario.

## Steps to install it on your own Salesforce Developer Edition Org

- Request your Salesforce Developer Org [here](https://developer.salesforce.com/signup)
- Install the Pablo Gonzalez Feature Flags project on it.
- Install the code on this repository.
- You must add the LWC control 'accountDetails' into the Account Record page (preferrably below the compact layout).
_(open any account record, go to the wheel, then Edit Page and drag & drop the accountDetail LWC into the layout)_
- You'd want to run scripts/bash/wskeepalive.sh since the free service I used for the PoC (render.com) spins down the webservice due to inactivity.


## Read All About It

- [simpleWsRust: complete rust-rocket
 code for the webservice used here](https://github.com/smelgin/simpleWsRust)
- [Pablo Gonzalez Feature Flags project](https://github.com/pgonzaleznetwork/salesforce-feature-flags)
- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
