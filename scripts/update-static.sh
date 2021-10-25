#!/bin/bash

cd $(dirname "$0")
cd ..


download_dependencies(){
  PACKAGE_NAME=$1
  NEW_IMPORTS=$(cat static/js/$PACKAGE_NAME.js | grep -w "import")
  while IFS= read -r line ; do
    if [ -z "$line" ]
    then
      continue
    fi
    NEW_IMPORT_PACKAGE_NAME=$(echo $line | sed -r 's/^import (.+) from "\/-\/(.+)@(.+)";/\2/' )
    NEW_IMPORT_HASH=$(echo $line | sed -r 's/^import (.+) from "\/-\/(.+)@(.+)";/\3/' )
    NEW_IMPORT_URL="https://cdn.skypack.dev/-/$NEW_IMPORT_PACKAGE_NAME@$NEW_IMPORT_HASH"
    curl $NEW_IMPORT_URL > static/js/$NEW_IMPORT_PACKAGE_NAME.js
    sed -i "s~\/\-\/$NEW_IMPORT_PACKAGE_NAME@$NEW_IMPORT_HASH~\.\/$NEW_IMPORT_PACKAGE_NAME.js~" static/js/$PACKAGE_NAME.js
    download_dependencies $NEW_IMPORT_PACKAGE_NAME
  done <<< "$NEW_IMPORTS"
}

download_pkg(){
  PACKAGE_NAME=$1
  PACKAGE_VERSION=$2
  NEW_URL="https://cdn.skypack.dev$(curl https://cdn.skypack.dev/$PACKAGE_NAME@$PACKAGE_VERSION | grep "export \*" | sed -r "s/export \* from '(.*)';/\1/")"
  mkdir -p static/js
  curl $NEW_URL > static/js/$PACKAGE_NAME.js
  download_dependencies $PACKAGE_NAME
}

rm -f static/js/*

download_pkg "dompurify" "2.2.3"
download_pkg "marked" "1.2.6"
