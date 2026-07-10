# git-find-remote

A CLI tool that recursively searches directories and finds Git repositories by remote URL or repository name. Have you ever worked on a project and forgot with you had been working on it on your computer? This is the package for you. It will locate the package on your computer.

## Installation

```bash
npm install -g git-find-remote
```
Or if you dont want to install you can use:
```bash
npx git-find-remote your-github-repo-name
```

## Usage

You can search for your repos in 3 ways.
1. Using just the repository name:
```bash
git-find-remote your-github-repo-name
```
2. Including the username for the repository
```bash
git-find-remote your-username/your-github-repo-name
```
3. Full Github url
```bash
git-find-remote https://github.com/your-username/your-github-repo-name
```

## Features
- Recursive directory search
- Supports HTTPS Git URLs
- Supports SSH Git URLs
- Search by repository name
- Ignores node_modules and build folders