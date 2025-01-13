#!/usr/bin/env fish

yarn vite renderer &
set pid1 $last_pid

ELECTRON_START_URL=http://localhost:5173 NODE_OPTIONS='--import tsx' yarn electron . &
set pid2 $last_pid

function cleanup
    kill $pid1 $pid2
    wait $pid1 $pid2 2>/dev/null
    exit
end

trap cleanup SIGINT

wait $pid1
wait $pid2