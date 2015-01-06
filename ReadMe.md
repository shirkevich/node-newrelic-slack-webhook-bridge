# New Relic -> Slack

This code provides a New Relic webhook to forward to your Slack webhook (so you can avoid adding another Slack Integration).

The procfile is included for launching the code on Heroku.

## Instructions:
Copy config.json.sample to config.json and fill it out with your slack webhook details (hook_url and room), then deploy to heroku.

The service listens at `/newrelic/hook`. Setting up your NewRelic webhook will therefore need the URL: `https://your-heroku-instance-name.herokuapp.com/newrelic/hook`

NB because config.json is listed in .gitignore, you will either need to remove that line from .gitignore file, or force adding the file using command `git add config.json -f`

## Credit
This code is based heavily on:

- https://github.com/atuttle/node-newrelic-fwd-slack
- https://github.com/xoxco/node-slack