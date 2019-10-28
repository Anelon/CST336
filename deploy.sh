#!/bin/sh

read -p 'Commit message: ' commit
#echo $commit
if [ ! -z "$commit" ]
then
   git add "../../."
   git commit -m "$commit"
   git push origin master

   testDir=$(dirname $PWD)
   typeName=${testDir##*/}
   labName=${PWD##*/}
   prefix="$typeName/$labName/"
   echo $prefix

   #subtree needs to be ran from the base git folder
   cd ../.. 
   git subtree split -b "$labName" --prefix="$prefix"
   #git subtree split -b lab1 --prefix="labs/lab1/"
   git push origin $labName
else
   echo "Please enter a commit message"
fi
