// Git and GitHub lessons. Each lesson's status (completed / in-progress / not-started)
// is derived from saved progress, so it is NOT written here.
// `id` must match the `lessonId` used in questions.js.
export const LESSONS = [
  {
    id: 'git-1',
    title: 'What is Git?',
    subtitle: 'Version control basics',
    contentTitle: 'Git is a version control system',
    description:
      'Git tracks changes to your code over time. It remembers what changed, who changed it, and lets you go back to an earlier version whenever you need to. It also lets many developers work on the same project without overwriting each other. Git was created by Linus Torvalds in 2005. Most Git actions happen on your own computer. Only push and pull talk to a remote server such as GitHub.',
    code: `# Check that Git is available
git --version`,
  },
  {
    id: 'git-2',
    title: 'Install and configure Git',
    subtitle: 'Set your name and email',
    contentTitle: 'Tell Git who you are',
    description:
      'After installing Git, set your name and email once. Git attaches them to every commit you make, so teammates can see who made each change. The --global flag saves the settings for every project on your computer.',
    code: `git config --global user.name "Your Name"
git config --global user.email "you@example.com"`,
  },
  {
    id: 'git-3',
    title: 'Create a repository',
    subtitle: 'git init',
    contentTitle: 'Turn a folder into a repository',
    description:
      'A repository is a folder that Git tracks. Run git init inside your project folder to start. Git creates a hidden .git folder where it stores the full history of your project. Delete that folder and the folder is no longer a repository.',
    code: `mkdir my-project
cd my-project
git init`,
  },
  {
    id: 'git-4',
    title: 'New files and status',
    subtitle: 'git status',
    contentTitle: 'See what changed',
    description:
      'git status shows the state of your project: which files are new, which are modified, and which are ready to be saved. A brand new file is called untracked, because Git sees it but is not tracking its changes yet. Run git status often. It is the quickest way to know where you are.',
    code: `echo "Hello Git" > index.html
git status`,
  },
  {
    id: 'git-5',
    title: 'The staging environment',
    subtitle: 'git add',
    contentTitle: 'Choose what goes in the next commit',
    description:
      'Staging is a waiting area between your edits and a commit. When you stage a file with git add, you tell Git to include it in the next snapshot. This lets you commit only related changes together, even when you edited many files.',
    code: `# Stage one file
git add index.html

# Stage every change
git add --all`,
  },
  {
    id: 'git-6',
    title: 'Commit your changes',
    subtitle: 'git commit',
    contentTitle: 'Save a snapshot of your work',
    description:
      'A commit is a saved snapshot of everything you staged. Always add a short message that explains what changed and why, for example "Add login page". Git does not store a full copy of every file each time. It keeps track of the changes made in each commit. Use git log to see your history.',
    code: `git commit -m "Add index page"
git log --oneline`,
  },
  {
    id: 'git-7',
    title: 'Branches',
    subtitle: 'git branch and git switch',
    contentTitle: 'Work on features safely',
    description:
      'A branch is a separate line of work. You can try a new feature or fix a bug on its own branch without touching the main code. If it works out, you merge it back. If not, you can throw the branch away.',
    code: `# Create a branch
git branch new-feature

# Switch to it
git switch new-feature

# See all branches
git branch`,
  },
  {
    id: 'git-8',
    title: 'Merging branches',
    subtitle: 'git merge',
    contentTitle: 'Combine your work',
    description:
      'Merging brings the changes from one branch into another. First switch to the branch that should receive the changes, usually main, then run git merge with the other branch name. If two branches changed the same lines, Git reports a merge conflict, and you choose which version to keep.',
    code: `git switch main
git merge new-feature`,
  },
  {
    id: 'git-9',
    title: 'Connect to GitHub',
    subtitle: 'Remotes, push and pull',
    contentTitle: 'Share your code online',
    description:
      'GitHub is a website that hosts Git repositories online. To connect your local project, add the GitHub repository as a remote, usually called origin. Push sends your commits to GitHub, and pull downloads new commits from it.',
    code: `git remote add origin https://github.com/user/my-project.git
git push -u origin main

# Later, to get new changes
git pull origin main`,
  },
  {
    id: 'git-10',
    title: 'GitHub flow and pull requests',
    subtitle: 'Fork, clone and contribute',
    contentTitle: 'Collaborate with others',
    description:
      'GitHub flow is a simple way to collaborate: create a branch, make commits, push the branch, then open a pull request. A pull request asks teammates to review your changes before they are merged into main. To contribute to someone else\'s project, fork it first to get your own copy, clone that copy to your computer, then send a pull request back.',
    code: `git clone https://github.com/user/project.git
git switch -c my-feature
git add --all
git commit -m "Fix typo in README"
git push -u origin my-feature
# then open a pull request on GitHub`,
  },
];
