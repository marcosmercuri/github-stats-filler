#!/bin/bash

BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
set -e

goal_fill-last-year() {
  node main-past-year.js
}

goal_upload-function-to-aws() {
  serverless deploy
}

if type -t "goal_$1" &>/dev/null; then
  goal_$1 ${@:2}
else
  echo "usage: $0 <goal>
goal:
    fill-last-year            -- fill the previous 12 months with commits, once a week
    upload-function-to-aws    -- upload lambda function to aws
    "
  exit 1
fi
