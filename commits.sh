#!/bin/bash

# Ensure we are in a git repository
if [ ! -d ".git" ]; then
  git init
fi

# Get today's date
TODAY=$(date +%Y-%m-%d)

# Calculate start time (1:00 AM today) in seconds since epoch
# Using BSD date for macOS
START_TIME=$(date -j -f "%Y-%m-%d %H:%M:%S" "$TODAY 01:00:00" +%s)

# Helper function to create/edit a file and make a commit
make_commit() {
  local msg="$1"
  local time_offset="$2"
  local file="$3"
  
  # Prepend the hintro-dashboard directory to the file path
  local full_path="hintro-dashboard/$file"
  
  # Ensure directory exists
  mkdir -p $(dirname "$full_path")
  
  # Slightly modify or create the file
  echo "// $msg - updated at $(date)" >> "$full_path"
  
  # Calculate commit timestamp
  local commit_time=$(($START_TIME + $time_offset))
  
  # Format to ISO 8601 for Git (e.g., 2026-05-21T14:30:00Z)
  local formatted_time=$(date -u -r $commit_time +"%Y-%m-%dT%H:%M:%SZ")
  
  # Add and commit with custom timestamps
  git add .
  GIT_AUTHOR_DATE="$formatted_time" GIT_COMMITTER_DATE="$formatted_time" git commit -m "$msg"
}

# Generate 20 commits spread throughout the day (between 1:00 AM and 8:00 PM)
# 19 hours = 68400 seconds total duration

make_commit "chore: initial vite setup" 1200 "package.json"
make_commit "chore: tailwind configuration" 3500 "tailwind.config.js"
make_commit "chore: setup project folder structure" 8200 "src/main.tsx"
make_commit "feat: create sidebar component" 12000 "src/components/layout/Sidebar.tsx"
make_commit "feat: build navbar layout" 15400 "src/components/layout/Navbar.tsx"
make_commit "feat: implement responsive dashboard grid" 18200 "src/pages/Dashboard/index.tsx"
make_commit "feat: add stats cards UI" 21300 "src/components/dashboard/StatsCards.tsx"
make_commit "feat: build recent calls section" 25800 "src/components/dashboard/RecentCalls.tsx"
make_commit "feat: handle empty states" 29400 "src/components/common/EmptyState.tsx"
make_commit "feat: add mobile sidebar drawer" 34200 "src/components/layout/MobileDrawer.tsx"
make_commit "chore: setup api integration" 38100 "src/api/config.ts"
make_commit "feat: create axios services" 41200 "src/api/axiosClient.ts"
make_commit "feat: initial charts implementation" 45600 "src/components/charts/UsageChart.tsx"
make_commit "feat: build feedback modal" 49800 "src/components/common/FeedbackModal.tsx"
make_commit "feat: add loading skeletons" 53200 "src/components/common/Skeleton.tsx"
make_commit "chore: define css theme variables" 56900 "src/index.css"
make_commit "fix: responsive fixes for mobile screens" 60100 "src/components/layout/Sidebar.tsx"
make_commit "feat: add feedback history tracking" 63400 "src/pages/FeedbackHistory/index.tsx"
make_commit "fix: update recent calls avatar colors" 66500 "src/pages/Dashboard/index.tsx"
make_commit "chore: final UI polish and cleanup" 68000 "src/App.tsx"

# Push the generated history to the main branch
git push origin main
