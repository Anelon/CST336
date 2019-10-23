#!/bin/sh

read -p 'Commit message: ' commit
#echo $commit
if [ ! -z "$commit" ]
then
   git add "/Volumes/HDD/Programing/CSUMB/CST336/classGit/."
   git commit -m "$commit"
   git push origin master

   testDir=$(dirname $PWD)
   typeName=${testDir##*/}
   labName=${PWD##*/}
   prefix="$typeName/$labName"

   #subtree needs to be ran from the base git folder
   cd ../.. 
   git subtree split -b $dirname --prefix="$prefix"
   git push origin $dirname
else
   echo "Please enter a commit message"
fi
