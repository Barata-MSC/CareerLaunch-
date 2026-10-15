

const VIDEOS = {
  mosh: {
    id: '8JJ101D3knE',
    title: 'Git Tutorial for Beginners: Learn Git in 1 Hour',
    apaTitle: 'Git tutorial for beginners: Learn Git in 1 hour',
    channel: 'Programming with Mosh',
    date: '2020, September 15', // from the YouTube page. Verify before release.
  },
};

// lesson id -> [video key, start seconds, chapter label]
const VIDEO_FOR = {
  'git-1': ['mosh', 0],
  'git-2': ['mosh', 0],
  'git-3': ['mosh', 0],
  'git-4': ['mosh', 0],
  'git-5': ['mosh', 0],
  'git-6': ['mosh', 0],
  'git-7': ['mosh', 0],
  'git-8': ['mosh', 0],
  'git-9': ['mosh', 0],
  'git-10': ['mosh', 0],
};

const video = (lessonId) => {
  const [key, start = 0, chapter = ''] = VIDEO_FOR[lessonId];
  const v = VIDEOS[key];
  return { id: v.id, start, chapter, title: v.title, channel: v.channel };
};

// References are in APA 7th style (LessonReferences shows text + link)
const videoRef = (lessonId) => {
  const v = VIDEOS[VIDEO_FOR[lessonId][0]];
  return {
    text: `${v.channel}. (${v.date}). ${v.apaTitle} [Video]. YouTube.`,
    url: `https://youtu.be/${v.id}`,
  };
};
const w3 = (title, page) => ({
  text: `W3Schools. (n.d.). ${title}.`,
  url: `https://www.w3schools.com/git/${page}`,
});
const gitDoc = (cmd) => ({
  text: `Git. (n.d.). git-${cmd} documentation.`,
  url: `https://git-scm.com/docs/git-${cmd}`,
});
const ghLearning = {
  text: 'GitHub. (n.d.). Git and GitHub learning resources. GitHub Docs.',
  url: 'https://docs.github.com/en/get-started/start-your-journey/git-and-github-learning-resources',
};

// ---- Playground helpers -------------------------------------------------------------
// CodePlayground lowercases the text, removes /* */ comments and collapses all whitespace
// into single spaces before running a check. Starters use "#" comments that never contain
// a command, so they can't pass a check by accident.
const inOrder = (...patterns) => (text) => {
  let pos = 0;
  return patterns.every((re) => {
    const m = re.exec(text.slice(pos));
    if (!m) return false;
    pos += m.index + m[0].length;
    return true;
  });
};

const TERM_CSS =
  '.t{background:#211A38;color:#fff;font-family:monospace;padding:12px;border-radius:8px;font-size:12px;line-height:1.5}.t b{color:#b9a4ff}';
const goal = (task, shows) =>
  `<div class="t"><b>GOAL</b><br>${task}${shows ? `<br><br><b>YOU SHOULD SEE</b><br>${shows}` : ''}</div>`;

export const EXTRAS = {
  'git-1': {
    video: video('git-1'),
    activities: [
      {
        type: 'playground',
        title: 'Check your Git version',
        task: 'Type the command that prints the installed Git version, then press Run.',
        html: goal('Print the Git version.', 'git version 2.x.x'),
        baseCss: TERM_CSS,
        starter: '# type your command below\n',
        checks: [/\bgit\s+(?:--version|-v)(?=\s|$)/],
        hint: 'Use git followed by the --version flag.',
      },
      {
        type: 'quickCheck',
        question: 'Where do most Git actions happen?',
        options: [
          'On your own computer',
          'On GitHub servers',
          'Only in the browser',
          'On a shared network drive',
        ],
        correct: 0,
        hint: 'Only push and pull talk to a remote server.',
        explanation: 'Most Git actions run locally. Only push and pull talk to a remote such as GitHub.',
      },
    ],
    references: [w3('Git Intro', 'git_intro.asp'), ghLearning, videoRef('git-1')],
  },

  'git-2': {
    video: video('git-2'),
    activities: [
      {
        type: 'playground',
        title: 'Tell Git who you are',
        task: 'For every project on this computer, set your name to Ada Lovelace and your email to ada@example.com.',
        html: goal('Save your name and email globally.', 'No output means it worked.'),
        baseCss: TERM_CSS,
        starter: '# two commands, one per line\n',
        checks: [
          /\bgit\s+config\s+--global\s+user\.name\s+(?:"[^"]+"|'[^']+'|[^\s"']+)/,
          /\bgit\s+config\s+--global\s+user\.email\s+(?:"[^"]+"|'[^']+'|[^\s"']+)/,
        ],
        hint: 'git config --global user.name "Ada Lovelace" and the same for user.email.',
      },
      {
        type: 'quickCheck',
        question: 'What does the --global flag do in git config?',
        options: [
          'Saves the setting for every project on your computer',
          'Uploads the setting to GitHub',
          'Applies the setting to one commit only',
          'Makes your email public',
        ],
        correct: 0,
        hint: 'Think about how many projects the setting should cover.',
        explanation: '--global saves the setting once for all projects on your computer.',
      },
    ],
    references: [w3('Git Config', 'git_config.asp'), gitDoc('config'), videoRef('git-2')],
  },

  'git-3': {
    video: video('git-3'),
    activities: [
      {
        type: 'playground',
        title: 'Start a repository',
        task: 'Create a folder named my-app, move into it, then turn it into a Git repository.',
        html: goal('Make a folder, enter it, start Git.', 'Initialized empty Git repository'),
        baseCss: TERM_CSS,
        starter: '# three commands, in order\n',
        checks: [
          inOrder(/\bmkdir\s+my-app\/?(?=\s|$)/, /\bcd\s+my-app\/?(?=\s|$)/, /\bgit\s+init(?=\s|$)/),
        ],
        hint: 'mkdir my-app, then cd my-app, then git init. The order matters.',
      },
      {
        type: 'quickCheck',
        question: 'What happens if you delete the hidden .git folder?',
        options: [
          'The folder is no longer a repository',
          'Only the newest commit is lost',
          'Git moves the history to GitHub',
          'Nothing, Git rebuilds it',
        ],
        correct: 0,
        hint: 'That folder stores the full history of your project.',
        explanation: 'The .git folder holds the history. Without it, the folder is no longer a repository.',
      },
    ],
    references: [w3('Git Get Started', 'git_getstarted.asp'), gitDoc('init'), videoRef('git-3')],
  },

  'git-4': {
    video: video('git-4'),
    activities: [
      {
        type: 'playground',
        title: 'Create a file, then look',
        task: 'Create a file named notes.txt (with echo or touch), then ask Git for the status.',
        html: goal('New file, then status.', 'Untracked files: notes.txt'),
        baseCss: TERM_CSS,
        starter: '# create the file first, then check\n',
        checks: [
          inOrder(
            /(?:\becho\s+.+>\s*notes\.txt|\btouch\s+notes\.txt)(?=\s|$)/,
            /\bgit\s+status(?=\s|$)/
          ),
        ],
        hint: 'echo "hi" > notes.txt (or touch notes.txt), then git status.',
      },
      {
        type: 'quickCheck',
        question: 'Why is it fine to run git status as often as you like?',
        options: [
          'It only shows information and changes nothing',
          'It saves your work automatically',
          'It uploads your files to GitHub',
          'It deletes untracked files',
        ],
        correct: 0,
        hint: 'The lesson calls it the quickest way to know where you are.',
        explanation: 'git status only reports the state of your project, so it is safe to run anytime.',
      },
    ],
    references: [w3('Git New Files', 'git_new_files.asp'), gitDoc('status'), videoRef('git-4')],
  },

  'git-5': {
    video: video('git-5'),
    activities: [
      {
        type: 'playground',
        title: 'Stage one file',
        task: 'You edited style.css and app.js, but only style.css belongs in the next commit. Stage just that file.',
        html: goal('Stage only style.css.', 'Changes to be committed: style.css'),
        baseCss: TERM_CSS,
        starter: '# stage one file only\n',
        checks: [
          (t) =>
            /\bgit\s+add\s+style\.css(?=\s|$)/.test(t) &&
            !/\bgit\s+add\s+(?:--all|-a|\.)(?=\s|$)/.test(t),
        ],
        hint: 'Name the file: git add style.css. Do not use --all or a dot.',
      },
      {
        type: 'quickCheck',
        question: 'Why does Git have a staging area?',
        options: [
          'To commit only related changes together',
          'To upload files to GitHub',
          'To delete old files',
          'To create a new branch',
        ],
        correct: 0,
        hint: 'Think about editing many files but saving only some.',
        explanation: 'Staging lets you choose exactly which changes go into the next commit.',
      },
    ],
    references: [w3('Git Staging', 'git_staging_environment.asp'), gitDoc('add'), videoRef('git-5')],
  },

  'git-6': {
    video: video('git-6'),
    activities: [
      {
        type: 'playground',
        title: 'Save a snapshot',
        task: 'Commit your staged changes with the message "Add header", then show the history with one line per commit.',
        html: goal('Commit, then list the history.', '[main abc1234] Add header'),
        baseCss: TERM_CSS,
        starter: '# commit first, then view the history\n',
        checks: [
          inOrder(
            /\bgit\s+commit\s+-m\s+(?:"add header"|'add header')/,
            /\bgit\s+log\s+--oneline(?=\s|$)/
          ),
        ],
        hint: 'git commit -m "Add header" and then git log --oneline.',
      },
      {
        type: 'quickCheck',
        question: 'Which commit message is the most useful?',
        options: ['Add login page', 'stuff', 'asdf', 'changes'],
        correct: 0,
        hint: 'A good message says what changed.',
        explanation: 'A short message that explains what changed, like "Add login page", helps your team later.',
      },
    ],
    references: [w3('Git Commit', 'git_commit.asp'), gitDoc('commit'), videoRef('git-6')],
  },

  'git-7': {
    video: video('git-7'),
    activities: [
      {
        type: 'playground',
        title: 'Start a feature branch',
        task: 'Create a branch called login and switch to it.',
        html: goal('Create the login branch and be on it.', "Switched to branch 'login'"),
        baseCss: TERM_CSS,
        starter: '# make the branch, then move onto it\n',
        checks: [
          (t) =>
            /\bgit\s+(?:switch\s+(?:-c|--create)|checkout\s+-b)\s+login(?=\s|$)/.test(t) ||
            inOrder(/\bgit\s+branch\s+login(?=\s|$)/, /\bgit\s+(?:switch|checkout)\s+login(?=\s|$)/)(t),
        ],
        hint: 'git branch login, then git switch login. (git switch -c login does both.)',
      },
      {
        type: 'quickCheck',
        question: 'Which command lists all your branches?',
        options: ['git branch', 'git branches', 'git list', 'git switch'],
        correct: 0,
        hint: 'It is the same command you use to create a branch, with no name.',
        explanation: 'git branch with no name lists your branches.',
      },
    ],
    references: [w3('Git Branch', 'git_branch.asp'), gitDoc('branch'), videoRef('git-7')],
  },

  'git-8': {
    video: video('git-8'),
    activities: [
      {
        type: 'playground',
        title: 'Merge a finished feature',
        task: 'You are on the login branch and it is finished. Bring it into main.',
        html: goal('Go to main, then merge login.', 'Updating... or Merge made by...'),
        baseCss: TERM_CSS,
        starter: '# first go where the changes should land\n',
        checks: [
          inOrder(/\bgit\s+(?:switch|checkout)\s+main(?=\s|$)/, /\bgit\s+merge\s+login(?=\s|$)/),
        ],
        hint: 'Switch to main first, then run git merge login.',
      },
      {
        type: 'quickCheck',
        question: 'Two branches changed the same lines. What does Git report?',
        options: ['A merge conflict', 'A syntax error', 'An untracked file', 'A missing remote'],
        correct: 0,
        hint: 'Git cannot decide which version to keep.',
        explanation: 'Git reports a merge conflict, and you choose which version to keep.',
      },
    ],
    references: [w3('Git Merge', 'git_branch_merge.asp'), gitDoc('merge'), videoRef('git-8')],
  },

  'git-9': {
    video: video('git-9'),
    activities: [
      {
        type: 'playground',
        title: 'Connect to GitHub',
        task: 'Add https://github.com/ada/app.git as the remote named origin, then push your main branch to it.',
        html: goal('Add the remote, then push main.', "Branch 'main' set up to track 'origin/main'"),
        baseCss: TERM_CSS,
        starter: '# add the remote, then upload\n',
        checks: [
          inOrder(
            /\bgit\s+remote\s+add\s+origin\s+https:\/\/github\.com\/ada\/app(?:\.git)?(?=\s|$)/,
            /\bgit\s+push\s+(?:(?:-u|--set-upstream)\s+)?origin\s+main(?=\s|$)/
          ),
        ],
        hint: 'git remote add origin <url>, then git push -u origin main.',
      },
      {
        type: 'quickCheck',
        question: 'In "git push origin main", what is origin?',
        options: [
          'The usual name for the remote repository',
          'Your first commit',
          'Your GitHub username',
          'A branch',
        ],
        correct: 0,
        hint: 'It is the name you gave the remote when you added it.',
        explanation: 'origin is the usual nickname for the remote repository on GitHub.',
      },
    ],
    references: [w3('GitHub Set Remote', 'git_set_remote.asp'), gitDoc('remote'), videoRef('git-9')],
  },

  'git-10': {
    video: video('git-10'),
    activities: [
      {
        type: 'playground',
        title: 'Start contributing',
        task: 'You forked a project. Clone your fork from https://github.com/ada/project.git, then create and switch to a branch called fix-typo.',
        html: goal('Clone your fork, then branch.', "Cloning into 'project'..."),
        baseCss: TERM_CSS,
        starter: '# clone first, then branch\n',
        checks: [
          inOrder(
            /\bgit\s+clone\s+https:\/\/github\.com\/ada\/project(?:\.git)?(?=\s|$)/,
            /\bgit\s+(?:switch\s+(?:-c|--create)|checkout\s+-b)\s+fix-typo(?=\s|$)/
          ),
        ],
        hint: 'git clone <url>, then git switch -c fix-typo.',
      },
      {
        type: 'quickCheck',
        question: 'In GitHub flow, what comes right after you push your branch?',
        options: [
          'Open a pull request',
          'Delete the repository',
          'Run git init',
          'Merge without review',
        ],
        correct: 0,
        hint: 'Teammates need a chance to review your changes.',
        explanation: 'You open a pull request so teammates can review your changes before they are merged.',
      },
    ],
    references: [w3('GitHub Flow', 'git_github_flow.asp'), gitDoc('clone'), videoRef('git-10')],
  },
};
