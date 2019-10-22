if [ $1 ]
then
   testDir=$(dirname $PWD)
   echo $testDir
   typeName=${testDir##*/}
   dirName=${PWD##*/}
   echo $typeName
   echo $dirName
   cd ../..
   cd "./$typeName/$dirName"
else
   echo "Please enter a commit message"
fi
