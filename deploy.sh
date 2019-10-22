if [ $1 ]
then
   git add .
   git commit -m "$1"
   git push origin master

   testDir=$(dirname $PWD)
   typeName=${testDir##*/}
   labName=${PWD##*/}

   git subtree split -b $dirname -P "$typeName/$labName"
   git push origin lab1
else
   echo "Please enter a commit message"
fi
