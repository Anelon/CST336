if [ $1 ]
then
   testDir=$(dirname $PWD)
   echo $testDir
   typeName=${testDir##*/}
   dirName=${PWD##*/}
   prefix="$typeName/$dirName"
   echo $typeName
   echo $dirName
   echo $prefix

   cd ../..
   cd "./$typeName/$dirName"
else
   echo "Please enter a commit message"
fi
