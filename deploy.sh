if [ $1 ]
then
   git add "/Volumes/HDD/Programing/CSUMB/CST336/classGit/."
   git commit -m "$1"
   git push origin master

   testDir=$(dirname $PWD)
   typeName=${testDir##*/}
   labName=${PWD##*/}
   prefix="$typeName/$labName"

   git subtree split -b $dirname -P $prefix
   git push origin lab1
else
   echo "Please enter a commit message"
fi
