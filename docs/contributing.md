---
title: "Contributing"
description: "Steps for easier development and debugging purposes of Nuxt Optimized Images."
created: "2019-03-01T18:51:10Z"
published: "2019-03-01T18:51:10Z"
modified: "2020-07-15T16:46:04Z"
position: 5
category: "Getting started"
---

Please make sure to read this **Contributing Guide** before making a contribution.

## Development setup

1. Fork and clone the repo
2. Run `npm install` to install dependencies
3. Run `npm test` to run validation
4. Create a branch for your PR with `git checkout -b pr/your-branch-name`

### Commonly used NPM scripts

**Watch and serve the examples with hot reload**

```shell
npm run start
```

**Lint source codes**
```shell
npm run lint
```

**Run unit tests**
```shell
npm run test
```

## Issue Reporting Guidelines

- The [issue list][issues-link] of this project is **exclusively** for bug reports and feature requests. Non-conforming issues will be closed immediately.

- Try to search for your issue, it may have already been answered or even fixed in the development branch.

- Check if the issue is reproducible with the latest stable version of Vue. If you are using a pre-release, please indicate the specific version you are using.

- It is **required** that you clearly describe the steps necessary to reproduce the issue you are running into. Issues with no clear repro steps will not be triaged. If an issue labeled "request-more-info" receives no further input from the issue author for more than 5 days, it will be closed.

- For bugs that involves build setups, you can create a reproduction repository with steps in the README.

- If your issue is resolved but still open, don't hesitate to close it. In case you found a solution by yourself, it could be helpful to explain how you fixed it.

## Pull Request Guidelines

- The `master` branch is basically just a snapshot of the latest stable release. All development should be done in dedicated branches. **Do not submit PRs against the `master` branch.**

- Checkout a topic branch from the relevant branch, e.g. `develop`, and merge back against that branch.

- Work in the `lib` an `examples` folders and **DO NOT** checkin `dist` in the commits.

- It's OK to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging.

- Make sure `npm run lint` and `npm run test` passes.

- If adding new feature:
  - Add accompanying test case.
  - Provide convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it.

- If fixing a bug:
  - Provide detailed description of the bug in the PR. Live demo preferred.


[issues-link]: https://github.com/juliomrqz/nuxt-optimized-images/issues
