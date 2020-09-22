MSG="[ci] build online demo site"
log=`git log -1 --pretty=%B`

if [ "$log" = "$MSG" ]
then
  echo "No need to build"
  exit 0
else
  npm i
  npm run build
  git config --global user.email "dolymood@gmail.com"
  git config --global user.name "dolymood"
  git add .
  git commit -m "${MSG}"
  git push origin master
fi
